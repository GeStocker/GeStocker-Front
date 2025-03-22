'use client'
import { Button } from "@/components/ui/button";
import { Camera, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getImageUser, uploadImageUser } from "@/services/user/user";// Importa la función para enviar la imagen
import { useAuth } from "@/context/AuthContext";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";

const ImagePerfil = () => {
  const [userImage, setUserImage] = useState<string | null>("/sadImage.png");
  const [fileImage, setFileImage] = useState<File | null>(null);
  const { token } = useAuth();
  const userId = getUserIdFromToken(token ?? "") ?? "";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileImage(file); 

      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendImageToBackend = async () => {
    if (!fileImage) return;
    try {
      const imageUrl = await uploadImageUser(userId, token ?? "", fileImage);
      console.log("Imagen subida con éxito:", imageUrl);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const removeImage = () => {
    setUserImage("/sadImage.png");
    setFileImage(null);
  };

  const fetchUserImage = async () =>{
    try {
      const image = await getImageUser(userId, token ?? "");
      if (!image) {
        setUserImage("/sadImage.png")
        return;
      }
      setUserImage(image)
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  }

  useEffect(()=>{
    fetchUserImage()
  },[fileImage])

  return (
    <div className="flex flex-col items-center">
      <div className=" relative">

      <img src={userImage} alt="User Profile" className="w-40 h-40 rounded-full" />
      <div className="absolute -right-2 -bottom-2">
        <label htmlFor="profile-image" className="cursor-pointer">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <Camera className="h-4 w-4" />
          </div>
        </label>
        <input
          id="profile-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          />
          </div>
      </div>
      {userImage && (
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" onClick={sendImageToBackend}>
            Guardar foto
          </Button>
          <Button variant="outline" size="sm" onClick={removeImage}>
            <Trash2 className="h-4 w-4" />
            Eliminar foto
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImagePerfil;
