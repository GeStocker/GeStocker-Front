import React from "react";

const YouTubeEmbed: React.FC<{videoId: string}> = ({videoId}) => {
  return (
    
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>
    
  );
};

export default YouTubeEmbed;
