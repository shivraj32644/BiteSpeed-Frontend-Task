import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="bg-[var(--background)] flex items-center justify-between py-3 px-4  w-full shadow-md">
      <a href="/" className=" h-10 rounded-md overflow-hidden w-40 ">
        <img
          className="h-full object-cover w-full"
          src="https://cdnv2.cutshort.io/company-static/5fcfb916590c57590bc96bad/user_uploaded_data/cover_pictures/company_cover_pic_tro8943z.png"
          alt=""
        />
      </a>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
