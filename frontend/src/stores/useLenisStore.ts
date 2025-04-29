import { create } from "zustand";
import Lenis from "lenis";
interface Ilenis {
  lenis: Lenis | null
  animateFrame: null | any
  init: () => void
  cancelAnimationFrame: () => void
}


export const useLenisStore = create<Ilenis>()((set, get) => {
  let animateFrameId: number | null = null;
  return {
    lenis: null,
    animateFrame: null,
    init: () => {
      const lenis = new Lenis({
        lerp: 0.2,
      })
      set({ lenis })
      const animate = (time: number) => {
        lenis.raf(time)
        animateFrameId = requestAnimationFrame(animate)
      }

      animateFrameId = requestAnimationFrame(animate);
    },
    cancelAnimationFrame: () => {
      if (animateFrameId)
        cancelAnimationFrame(animateFrameId)
      get().lenis?.destroy()
    },
  }

})