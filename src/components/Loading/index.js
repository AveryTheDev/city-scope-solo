import React from "react";
import ContentLoader from "react-content-loader";

export const ListLoader = () => (
         <ContentLoader
           height={160}
           width={400}
           speed={2}
           primaryColor="#f3f3f3"
           secondaryColor="#ecebeb"
         >
           <rect x="26" y="38" rx="5" ry="5" width="220" height="10" />
           <rect x="26" y="73" rx="5" ry="5" width="220" height="10" />
           <rect x="25" y="108" rx="5" ry="5" width="220" height="10" />
           <rect x="26" y="38" rx="5" ry="5" width="220" height="10" />
           <rect x="26" y="73" rx="5" ry="5" width="220" height="10" />
           <rect x="25" y="108" rx="5" ry="5" width="220" height="10" />
         </ContentLoader>
       );

export const GraphLoader = () => (
  <ContentLoader 
    height={475}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="2" y="22" rx="5" ry="5" width="400" height="400" /> 
    <rect x="28" y="34" rx="0" ry="0" width="0" height="0" />
  </ContentLoader>
)

export const ParagraphLoader = () => ( 
    <ContentLoader
      height={475}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="-1" y="224" rx="5" ry="5" width="400" height="168" />
      <rect x="28" y="34" rx="0" ry="0" width="0" height="0" />
    </ContentLoader>
  
)