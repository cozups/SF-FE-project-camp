'use client';

interface Props {
  children: string;
  type?: 'text' | 'secondary' | 'filled' | 'ghost';
  className?: string;
  onClick?: () => void;
}

function CustomButton({ children, type = 'text', className, onClick }: Props) {
  let customClassName = '';
  if (type === 'text') {
    customClassName = `border border-transparent bg-white text-[#6D6D6D] 
      hover:bg-[#F6F6F6] 
      active:text-black active:bg-[#F0F0F0] active:border-[#D2D2D2]
      focus:text-black focus:border-[#5F5F5F]`;
  }
  if (type === 'filled') {
    customClassName = `border border-transparent text-white bg-[#E79057] 
      hover:border-[#E26F24] 
      active:bg-[#E26F24] active:text-white 
      focus:bg-[#AD4500] focus:text-white focus:border-transparent`;
  }
  if (type === 'secondary') {
    customClassName = `bg-white border border-[#E79057] text-[#E79057] 
      hover:bg-[#FFF9F5] 
      active:text-[#AD4500] active:bg-[#FFF9F5] 
      focus:bg-[#FFC097] focus:text-[#AD4500] focus:border-[#E79057]`;
  }
  if (type === 'ghost') {
    customClassName = `text-[#939393] bg-[#F6F6F6] border border-transparent
      hover:bg-[#E7E7E7] 
      active:text-[#454545] active:border active:border-[#999999] active:bg-[#E7E7E7]
      focus:border focus:bg-[#F6F6F6] focus:border-[#999999] focus:text-black`;
  }
  return (
    <button
      className={`text-sm text-center px-3 py-[6px] rounded-md ${customClassName} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { CustomButton };
