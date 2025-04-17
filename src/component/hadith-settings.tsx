import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { EditIcon, Trash } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GetHadiths } from "../functions/get-hadiths";
interface HadithResponse {
  id: number;
  content: string;
}

interface FormData {
  content: string;
}

// These functions would need to be implemented in your functions folder
const EditHadith = async (data: FormData, id: number) => {
  const prayerTimeIdlebTimeAdminToken = Cookies.get(
    "prayerTimeIdlebTimeAdminToken"
  );

  const response = await fetch(
    `${import.meta.env.VITE_APIKEY}/api/hadiths/update/${id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",

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

const DeleteHadith = async (id: number) => {
  const prayerTimeIdlebTimeAdminToken = Cookies.get(
    "prayerTimeIdlebTimeAdminToken"
  );
  const response = await fetch(
    `${import.meta.env.VITE_APIKEY}/api/hadiths/delete/${id}`,
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
const AddHadith = async (formData: FormData) => {
  const token = Cookies.get("prayerTimeIdlebTimeAdminToken");

  const response = await fetch(
    `${import.meta.env.VITE_APIKEY}/api/hadiths/store`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      //@ts-ignore
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
};

const HadithSettings = () => {
  const [hadiths, setHadiths] = useState<HadithResponse[]>([]);
  const [selectedHadithId, setSelectedHadithId] = useState<number | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    content: "",
  });

  const queryClient = useQueryClient();

  const { data: hadithData, isLoading } = useQuery<HadithResponse[]>({
    queryKey: ["hadiths"],
    queryFn: () => GetHadiths(),
  });

  useEffect(() => {
    if (hadithData) {
      setHadiths(hadithData);
    }
  }, [hadithData]);

  const { mutate: editHadithMutation, isPending: isEditingHadith } =
    useMutation({
      mutationKey: ["edit-hadith"],
      mutationFn: async (data: FormData) => {
        const result = await EditHadith(data, selectedHadithId!);
        if (typeof result === "string") {
          throw new Error(result);
        }
        return result;
      },
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ["hadiths"] });
        toast.success("تم تعديل الحديث بنجاح");
        setIsEditDialogOpen(false);
      },
      onError: (error: Error) => {
        toast.error(error.message || "حدث خطأ أثناء تعديل الحديث");
      },
    });

  const { mutate: deleteHadithMutation, isPending: isDeletingHadith } =
    useMutation({
      mutationKey: ["delete-hadith"],
      mutationFn: async () => {
        const result = await DeleteHadith(selectedHadithId!);
        if (typeof result === "string") {
          throw new Error(result);
        }
        return result;
      },
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ["hadiths"] });
        toast.success("تم حذف الحديث بنجاح");
        setIsDeleteDialogOpen(false);
      },
      onError: (error: Error) => {
        toast.error(error.message || "حدث خطأ أثناء حذف الحديث");
      },
    });

  const { mutate: addHadithMutation, isPending: isAddingHadith } = useMutation({
    mutationKey: ["add-hadith"],
    mutationFn: async (data: FormData) => {
      const result = await AddHadith(data);
      if (typeof result === "string") {
        throw new Error(result);
      }
      return result;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["hadiths"] });
      toast.success("تم إضافة الحديث بنجاح");
      setIsAddDialogOpen(false);
      setFormData({ content: "" });
    },
    onError: (error: Error) => {
      toast.error(error.message || "حدث خطأ أثناء إضافة الحديث");
    },
  });

  const handleEditHadith = (e: FormEvent) => {
    e.preventDefault();

    editHadithMutation(formData);
  };

  const handleDeleteHadith = () => {
    deleteHadithMutation();
  };

  const handleAddHadith = (e: FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("content", formData.content);
    //@ts-ignore
    addHadithMutation(formDataToSend);
  };

  return (
    <div className="min-h-screen bg-amber-100/50 py-12 px-[calc(2vw+1rem)]">
      <div className="mx-auto px-4">
        <div className="flex flex-col justify-center  items-center mb-8">
          <h1 className="text-[calc(2vw+1rem)] text-center font-bold text-amber-900">
            الاحاديث النبوية الشريفة
          </h1>
          <button
            onClick={() => {
              setFormData({ content: "" });
              setIsAddDialogOpen(true);
            }}
            className="bg-amber-600 text-[calc(1vw+1rem)] px-8 my-[calc(1vw+1rem)] py-4 hover:bg-amber-700 text-white  rounded-3xl transition-colors">
            إضافة حديث جديد
          </button>
        </div>

        <div className="border border-amber-900/20 mt-10 rounded-lg overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-600 text-[calc(1vw+0.5rem)]">
                <tr>
                  <th className="text-white text-center py-3 px-2 w-1/12">
                    الرقم التسلسي
                  </th>
                  <th className="text-white text-center py-3 px-2 w-1/12">
                    المحتوى
                  </th>
                  <th className="text-white text-center py-3 px-2 w-1/12">
                    الادوات
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {isLoading ? (
                  <>
                    {Array(10)
                      .fill(null)
                      .map((_, index) => (
                        <tr key={index}>
                          {Array(3)
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
                  hadiths.map((hadith, index) => (
                    <tr
                      key={hadith.id}
                      className=" border border-amber-950/10 text-[calc(1vw+0.5rem)]">
                      <td className="py-3 px-2">{index + 1}</td>
                      <td className="py-3 px-2 truncate max-w-xs">
                        {hadith.content}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex justify-center items-center gap-x-2">
                          <button
                            onClick={() => {
                              setFormData({ content: hadith.content });
                              setSelectedHadithId(hadith.id);
                              setIsEditDialogOpen(true);
                            }}
                            className="text-teal-500 p-2 hover:bg-amber-100 rounded-full transition-colors">
                            {isEditingHadith &&
                            selectedHadithId === hadith.id ? (
                              <span className="inline-block h-5 w-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                              <EditIcon className="w-[calc(2vw+0.5rem)] h-[calc(2vw+0.5rem)]" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedHadithId(hadith.id);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-rose-500 p-2 hover:bg-amber-100 rounded-full transition-colors">
                            {isDeletingHadith &&
                            selectedHadithId === hadith.id ? (
                              <span className="inline-block h-5 w-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                              <Trash className="w-[calc(2vw+0.5rem)] h-[calc(2vw+0.5rem)]" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      {isEditDialogOpen && (
        <div className="fixed w-full inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl  p-[calc(1vw+1rem)]  w-[calc(32vw+2rem)]  text-right shadow-2xl border border-amber-100 animate-scaleIn">
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
                  تعديل الحديث
                </h2>
              </div>
              <p className="text-gray-600 text-[calc(0.8vw+0.7rem)]">
                يمكنك تعديل محتوى الحديث النبوي الشريف
              </p>
            </div>

            <form onSubmit={handleEditHadith} className="mt-6">
              <div className="mb-6">
                <label className="block text-amber-800 text-[calc(0.8vw+0.7rem)] mb-2 font-medium">
                  المحتوى
                </label>
                <div className="relative">
                  <textarea
                    className="w-full text-right text-[calc(0.8vw+0.7rem)] p-4 border border-amber-200 bg-amber-50/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                    rows={6}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    required
                    placeholder="أدخل نص الحديث هنا..."
                  />
                  <div className="absolute top-3 left-3 text-amber-400"></div>
                </div>
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
                  disabled={isEditingHadith}>
                  {isEditingHadith ? (
                    <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  ) : (
                    <></>
                  )}
                  حفظ التعديلات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteDialogOpen && (
        <div className="fixed w-full inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl  p-[calc(1vw+1rem)]  w-[calc(32vw+2rem)]  text-right shadow-2xl border border-amber-100 animate-scaleIn">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-rose-100 p-3 rounded-full"></div>
                <h2 className="text-[calc(1.5vw+1.2rem)] font-bold text-amber-900">
                  حذف الحديث
                </h2>
              </div>
              <p className="text-gray-600 text-[calc(0.8vw+0.8rem)]">
                هل أنت متأكد من حذف هذا الحديث؟ لا يمكن التراجع عن هذا الإجراء
              </p>
            </div>
            <div className="flex justify-between gap-4 mt-8">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-[calc(1vw+0.5rem)] py-[calc(0.5vw+0.3rem)] bg-gray-100 text-[calc(0.8vw+0.7rem)] text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex-1">
                إلغاء
              </button>
              <button
                onClick={() => {
                  handleDeleteHadith();
                  setIsDeleteDialogOpen(false);
                }}
                className="px-[calc(1vw+0.5rem)] py-[calc(0.5vw+0.3rem)] bg-rose-600 text-[calc(0.8vw+0.7rem)] text-white rounded-lg hover:bg-rose-700 transition-colors duration-300 flex-1 flex items-center justify-center">
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddDialogOpen && (
        <div className="fixed w-full inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl  p-[calc(1vw+1rem)]  w-[calc(32vw+2rem)]  text-right shadow-2xl border border-amber-100 animate-scaleIn">
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-green-100 p-3 rounded-full"></div>
                <h2 className="text-[calc(1.5vw+1rem)] font-bold text-amber-900">
                  إضافة حديث جديد
                </h2>
              </div>
              <p className="text-gray-600 text-[calc(0.8vw+0.7rem)]">
                يمكنك إضافة حديث نبوي شريف جديد إلى القائمة
              </p>
            </div>

            <form onSubmit={handleAddHadith} className="mt-6">
              <div className="mb-6">
                <label className="block text-amber-800 text-[calc(0.8vw+0.7rem)] mb-2 font-medium">
                  نص الحديث
                </label>
                <div className="relative">
                  <textarea
                    className="w-full text-right text-[calc(0.8vw+0.7rem)] p-4 border border-green-200 bg-green-50/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                    rows={6}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    required
                    placeholder="أدخل نص الحديث النبوي الشريف هنا..."
                  />
                  <div className="absolute top-3 left-3 text-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="px-[calc(1vw+0.5rem)] py-[calc(0.5vw+0.3rem)] bg-gray-100 text-[calc(0.8vw+0.7rem)] text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex-1">
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-[calc(1vw+0.5rem)] py-[calc(0.5vw+0.3rem)] bg-green-600 text-[calc(0.8vw+0.7rem)] text-white rounded-lg hover:bg-green-700 transition-colors duration-300 flex-1 flex items-center justify-center"
                  disabled={isAddingHadith}>
                  {isAddingHadith ? (
                    <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  ) : (
                    <></>
                  )}
                  إضافة الحديث
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Dialog */}
    </div>
  );
};
export default HadithSettings;
