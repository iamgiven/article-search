import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full h-[60px] xl:h-[80px] absolute top-0 flex items-center justify-center">
      <div className="w-[90%] xl:w-4/5 h-full border-[#ccc] flex items-center justify-between">
        <a className="h-full flex items-center gap-3" href="/">
          <img className="h-2/3" src="/search.png" alt="" />
          <h2 className="text-base font-semibold xl:text-xl">Article Search</h2>
        </a>
        
        <div className="h-full flex items-center gap-5">
          <a href="/docs" title="Articles">
            <img className="w-[28px] xl:w-[32px] aspect-square" src="/book.svg" alt="docs" />
          </a>
          <a href="https://github.com/iamgiven/article-search" target="_blank" title="Github" rel="noreferrer">
            <img className="w-[28px] xl:w-[32px] aspect-square" src="/github.svg" alt="github" />
          </a>
          <a href="/upload" title="Upload" rel="noreferrer">
            <img className="w-[28px] xl:w-[32px] aspect-square" src="/upload.svg" alt="upload" />
          </a>
          <a href="/user" title="Login" rel="noreferrer">
            <img className="w-[28px] xl:w-[32px] aspect-square" src="/user.svg" alt="user" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;