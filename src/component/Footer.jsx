import logo from '../images/logo.png'

const Footer = () => {
return(

<footer className="bg-white dark:bg-gray-900 mt-auto">
    <div className="mx-auto w-full max-w-screen-xl">
      <div className="ml-20 grid grid-cols-2 gap-8 px-8 py-6 lg:py-8 md:grid-cols-4">
      <div>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                    <img className='w-20' src={logo} alt="logo" />
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"></h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                    <a href="#" className=" hover:underline"></a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">FullStack app</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
            
             
              
                <li className="mb-4">
                    <a href="/about" className="hover:underline">About</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                </li>
            </ul>
        </div>
  
    </div>
    <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2023 <a href="https://github.com/memodiaz44">WD</a>. All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0">
     
        
        
        </div>
      </div>
    </div>
</footer>

)
}

export default Footer