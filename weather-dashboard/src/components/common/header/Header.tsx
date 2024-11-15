import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { SearchBar } from '@/components';
import { cityNameAtom } from '@/store';

function Header() {
  const [, setCityName] = useAtom(cityNameAtom);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setCityName(inputValue);
      setInputValue('');
    }
  };

  return (
    <header className="w-full h-20 flex items-center p-6 gap-6">
      <div className="w-1/2 flex items-center justify-start gap-6">
        {/* 로고 영역 */}
        <div className="h-full flex items-center justify-center gap-2">
          {/* 아이콘 */}
          <img src="src/assets/icons/logo.svg" alt="logo" className="h-10" />
          {/* 폰트 로고 */}
          <h3 className="poppins-bold scroll-m-20 text-2xl font-semibold tracking-tight">
            Weather.io
          </h3>
        </div>

        {/* 검색창 영역  */}
        <SearchBar
          placeholder="검색할 지역 이름을 영어로 입력하세요."
          className="flex-1"
          value={inputValue}
          onInput={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </header>
  );
}

export { Header };
