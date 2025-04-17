import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { EditIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GetIqameh } from "../functions/get-iqameh";

interface iqamehResponse {
  id: number;
  prayer: string;
  delay_minutes: number;
}

interface FormData {
  prayer: string;
  delay_minutes: number;
}

// These functions would need to be implemented in your functions folder
const Editiqameh = async (data: FormData, id: number) => {
  const prayerTimeIdlebTimeAdminToken = Cookies.get(
    "prayerTimeIdlebTimeAdminToken"
  );

  const response = await fetch(
    `${import.meta.env.VITE_APIKEY}/api/iqama-settings/update/${id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${prayerTimeIdlebTimeAdminToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    return error;
  }

  return response.json();
};

const Deleteiqameh = async (id: number) => {
  const prayerTimeIdlebTimeAdminToken = Cookies.get(
    "prayerTimeIdlebTimeAdminToken"
  );
  const response = await fetch(
    `${import.meta.env.VITE_APIKEY}/api/iqama-settings/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${prayerTimeIdlebTimeAdminToken}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    return error;
  }

  return response.json();
};

const Addiqameh = async (formData: FormData) => {
  const token = Cookies.get("prayerTimeIdlebTimeAdminToken");

  const response = await fetch(
    `${import.meta.env.VITE_APIKEY}/api/iqama-settings/store`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
};

const iqamehSettings = () => {
  const [iqamehs, setiqamehs] = useState<iqamehResponse[]>([]);
  const [selectediqamehId, setSelectediqamehId] = useState<number | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  //@ts-ignore
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  //@ts-ignore
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    prayer: "",
    delay_minutes: 0,
  });

  const queryClient = useQueryClient();

  const { data: iqamehData, isLoading } = useQuery<iqamehResponse[]>({
    queryKey: ["iqameh"],
    queryFn: () => GetIqameh(),
  });

  useEffect(() => {
    if (iqamehData) {
      setiqamehs(iqamehData);
    }
  }, [iqamehData]);

  const { mutate: editiqamehMutation, isPending: isEditingiqameh } =
    useMutation({
      mutationKey: ["edit-iqameh"],
      mutationFn: async (data: FormData) => {
        const result = await Editiqameh(data, selectediqamehId!);
        if (typeof result === "string") {
          throw new Error(result);
        }
        return result;
      },
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ["iqameh"] });
        toast.success("تم تعديل وقت الإقامة بنجاح");
        setIsEditDialogOpen(false);
      },
      onError: (error: Error) => {
        toast.error(error.message || "حدث خطأ أثناء تعديل وقت الإقامة");
      },
    });
  //@ts-ignore
  const { mutate: deleteiqamehMutation, isPending: isDeletingiqameh } =
    useMutation({
      mutationKey: ["delete-iqameh"],
      mutationFn: async () => {
        const result = await Deleteiqameh(selectediqamehId!);
        if (typeof result === "string") {
          throw new Error(result);
        }
        return result;
      },
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ["iqameh"] });
        toast.success("تم حذف وقت الإقامة بنجاح");
        setIsDeleteDialogOpen(false);
      },
      onError: (error: Error) => {
        toast.error(error.message || "حدث خطأ أثناء حذف وقت الإقامة");
      },
    });
  //@ts-ignore
  const { mutate: addiqamehMutation, isPending: isAddingiqameh } = useMutation({
    mutationKey: ["add-iqameh"],
    mutationFn: async (data: FormData) => {
      const result = await Addiqameh(data);
      if (typeof result === "string") {
        throw new Error(result);
      }
      return result;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["iqameh"] });
      toast.success("تم إضافة وقت الإقامة بنجاح");
      setIsAddDialogOpen(false);
      setFormData({ prayer: "", delay_minutes: 0 });
    },
    onError: (error: Error) => {
      toast.error(error.message || "حدث خطأ أثناء إضافة وقت الإقامة");
    },
  });

  const handleEditiqameh = (e: FormEvent) => {
    e.preventDefault();
    editiqamehMutation(formData);
  };

  return (
    <div className="min-h-screen bg-amber-100/50 py-12 px-[calc(2vw+1rem)]">
      <div className="mx-auto px-4">
        <div className="flex flex-col justify-center items-center mb-8">
          <h1 className="text-[calc(2vw+1rem)] text-center font-bold text-amber-900">
            إعدادات أوقات الإقامة
          </h1>
        </div>

        <div className="border border-amber-900/20 mt-10 rounded-lg overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-600 text-[calc(1vw+0.5rem)]">
                <tr>
                  <th className="text-white text-center py-3 px-2 w-1/12">
                    الرقم التسلسلي
                  </th>
                  <th className="text-white text-center py-3 px-2 w-1/12">
                    الصلاة
                  </th>
                  <th className="text-white text-center py-3 px-2 w-1/12">
                    وقت الإقامة (دقائق)
                  </th>
                  <th className="text-white text-center py-3 px-2 w-1/12">
                    الأدوات
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {isLoading ? (
                  <>
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <tr key={index}>
                          {Array(4)
                            .fill(null)
                            .map((_, cellIndex) => (
                              <td key={cellIndex} className="text-center py-4">
                                <div className="h-6 w-12 mx-auto bg-gray-200 animate-pulse rounded"></div>
                              </td>
                            ))}
                        </tr>
                      ))}
                  </>
                ) : (
                  iqamehs.map((iqameh, index) => (
                    <tr
                      key={iqameh.id}
                      className="border border-amber-950/10 text-[calc(1vw+0.5rem)]">
                      <td className="py-3 px-2">{index + 1}</td>
                      <td className="py-3 px-2 truncate max-w-xs">
                        {iqameh.prayer}
                      </td>
                      <td className="py-3 px-2 truncate max-w-xs">
                        {iqameh.delay_minutes} دقيقة
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex justify-center items-center gap-x-2">
                          <button
                            onClick={() => {
                              setFormData({
                                prayer: iqameh.prayer,
                                delay_minutes: iqameh.delay_minutes,
                              });
                              setSelectediqamehId(iqameh.id);
                              setIsEditDialogOpen(true);
                            }}
                            className="text-teal-500 p-2 hover:bg-amber-100 rounded-full transition-colors">
                            {isEditingiqameh &&
                            selectediqamehId === iqameh.id ? (
                              <span className="inline-block h-5 w-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                              <EditIcon className="w-[calc(1.5vw+0.5rem)] h-[calc(1.5vw+0.5rem)]" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}

                {/* Edit Dialog */}
                {isEditDialogOpen && (
                  <div className="fixed w-full inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl p-[calc(1vw+1rem)] w-[calc(32vw+2rem)] text-right shadow-2xl border border-amber-100 animate-scaleIn">
                      <div className="mb-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="bg-amber-100 p-3 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-6 h-6 text-amber-600">
                              <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                              <path d="m15 5 4 4"></path>
                            </svg>
                          </div>
                          <h2 className="text-[calc(1.5vw+1rem)] font-bold text-amber-900">
                            تعديل وقت الإقامة
                          </h2>
                        </div>
                        <p className="text-gray-600 text-[calc(0.8vw+0.7rem)]">
                          يمكنك تعديل وقت الإقامة للصلاة
                        </p>
                      </div>

                      <form onSubmit={handleEditiqameh} className="mt-6">
                        <div className="mb-6">
                          <label className="block text-amber-800 text-[calc(0.8vw+0.7rem)] mb-2 font-medium">
                            الصلاة
                          </label>
                          <input
                            type="text"
                            className="w-full text-right text-[calc(0.8vw+0.7rem)] p-4 border border-amber-200 bg-amber-50/50 rounded-lg focus:outline-none transition-all duration-300"
                            value={formData.prayer}
                            disabled
                            readOnly
                          />
                        </div>

                        <div className="mb-6">
                          <label className="block text-amber-800 text-[calc(0.8vw+0.7rem)] mb-2 font-medium">
                            وقت الإقامة (دقائق)
                          </label>
                          <input
                            type="number"
                            className="w-full text-right text-[calc(0.8vw+0.7rem)] p-4 border border-amber-200 bg-amber-50/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                            value={formData.delay_minutes}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                delay_minutes: parseInt(e.target.value) || 0,
                              })
                            }
                            min="0"
                            required
                            placeholder="أدخل وقت الإقامة بالدقائق"
                          />
                        </div>

                        <div className="flex justify-between gap-4 mt-8">
                          <button
                            type="button"
                            onClick={() => setIsEditDialogOpen(false)}
                            className="px-[calc(1vw+0.5rem)] py-[calc(0.5vw+0.3rem)] bg-gray-100 text-[calc(0.8vw+0.7rem)] text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex-1">
                            إلغاء
                          </button>
                          <button
                            type="submit"
                            className="px-[calc(1vw+0.5rem)] py-[calc(0.5vw+0.3rem)] bg-amber-600 text-[calc(0.8vw+0.7rem)] text-white rounded-lg hover:bg-amber-700 transition-colors duration-300 flex-1 flex items-center justify-center"
                            disabled={isEditingiqameh}>
                            {isEditingiqameh ? (
                              <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></span>
                            ) : null}
                            حفظ التعديلات
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default iqamehSettings;
