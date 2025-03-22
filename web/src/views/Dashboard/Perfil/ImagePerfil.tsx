import { Button } from "@/components/ui/button";
import { Camera, Trash2 } from "lucide-react";
import { useState } from "react";

const ImagePerfil = () => {
  const [userImage, setUserImage] = useState<string | null>("/sadImage.png");
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          const reader = new FileReader();
    
          reader.onloadend = () => {
            setUserImage(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      };

      const removeImage = () => {
        setUserImage("/sadImage.png");
          };

  return (
    <div className="flex flex-col items-center relative">
      <img src={userImage} alt="" className="w-40 h-40 rounded-full" />
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
        {userImage && (
        <Button
          variant="outline"
          size="sm"
          onClick={removeImage}
          className="mt-4"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar foto
        </Button>
      )}
      </div>
  );
};

export default ImagePerfil;
