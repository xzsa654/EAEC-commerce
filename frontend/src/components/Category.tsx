import { useGSAP } from '@gsap/react'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import CategoryList from './CategoryList';
// 确保注册插件
gsap.registerPlugin(useGSAP);

type Props = {
  isOpen: boolean,
  isAnimated: boolean,
  closeAnimated: () => void
  closeOpen: () => void
}

export default function Category({ isOpen, isAnimated, closeAnimated, closeOpen }: Props) {
  // 创建一个ref来引用category元素
  const categoryRef = useRef<HTMLDivElement>(null);
  // 创建一个ref来存储animation状态
  const animationRef = useRef<{tl: gsap.core.Timeline | null, isPlaying: boolean}>({
    tl: null,
    isPlaying: false
  });
  
  // 初始化和管理动画
  useEffect(() => {
    // 确保DOM元素存在
    if (!categoryRef.current) return;
    
    // 如果还没有创建timeline，则创建一个
    if (!animationRef.current.tl) {
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          animationRef.current.isPlaying = false;
          if (isOpen) closeAnimated();
        },
        onReverseComplete: () => {
          animationRef.current.isPlaying = false;
          if (!isOpen) {
            closeAnimated();
            closeOpen();
          }
        }
      });
      
      // 设置初始状态
      gsap.set(categoryRef.current, { 
        startAt: { y: "-100%" },
      });
      
      // 添加动画序列
      tl.to(categoryRef.current, {
        y: "10%",
        duration: 0.3,
        ease: "power3.out"
      });
      
      animationRef.current.tl = tl;
    }
    
    // 根据状态控制动画
    if (isOpen && isAnimated && !animationRef.current.isPlaying) {
      animationRef.current.isPlaying = true;
      animationRef.current.tl?.play();
    } else if (!isOpen && isAnimated && !animationRef.current.isPlaying) {
      animationRef.current.isPlaying = true;
      animationRef.current.tl?.reverse();
    }
    
  }, [isOpen, isAnimated, closeAnimated, closeOpen]);
    
  return (
    <div 
      ref={categoryRef}
      className={`category container mx-auto h-screen absolute -top-1 left-0 right-0 bg-foreground text-background rounded-xl p-6 z-50  `}
    >
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => {
            closeOpen();
            // 触发关闭动画
            animationRef.current.tl?.reverse();
            animationRef.current.isPlaying = true;
          }}
          className="p-2 rounded-full hover:bg-background/20"
        >
          ✕
        </button>
      </div>
      <CategoryList onClose={closeOpen} animationRef={animationRef} />
    </div>
  );
}