const Button = () => {
  return (
    <button className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-purple-800 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-3 origin-left hover:decoration-2 hover:text-purple-800 relative bg-gray-50 h-16 w-64 border-2 border-black text-left p-3 text-gray-900 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg">
      REGISTER
    </button>
  );
}

export default Button;
