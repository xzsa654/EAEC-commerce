import { useState } from "react";


export default function UseDropDown() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const handleItemEnter = (index: number) => {
    setCurrentIndex(index);
  }
  const handleItemLeave = () => {
    setCurrentIndex(null);
  }
  return {
    currentIndex,
    handleItemEnter,
    handleItemLeave,
  }

}
