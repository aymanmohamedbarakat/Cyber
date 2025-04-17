// import React from "react";
// import styles from "../MainHeader/index.module.css";
// import { useSideHeader } from "../../store";
// export default function SideHeader() {
//   const { closeSideHeader } = useSideHeader();
//   return (
//     <div className="overlay d-flex d-md-none" onClick={closeSideHeader}>
//       <div id={styles.content} onClick={(e) => e.stopPropagation()}></div>
//     </div>
//   );
// }


import React from "react";
import { useSideHeader } from "../../store";

export default function SideHeader() {
  const { closeSideHeader } = useSideHeader();
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 md:hidden flex"
      onClick={closeSideHeader}
    >
      <div 
        className="h-full w-[350px] fixed top-0 right-0 bg-white p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Side header content goes here */}
      </div>
    </div>
  );
}