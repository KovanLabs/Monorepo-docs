import Link from "next/link";
import Footer from "@/components/footer";

const ContactPage = () => {
  return (
    <>
    <div className="min-h-screen bg-background max-w-6xl mx-auto pt-12 md:pt-16 lg:pt-20 py-6 md:py-8 lg:py-10 flex flex-col items-start px-4 sm:px-6 md:px-0">
      <div className="pt-4 md:pt-6 lg:pt-8 mt-6 md:mt-8 lg:mt-10 border-b-2 border-black text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-left w-full">
        Contact
      </div>

      <div className="flex flex-col items-center w-full mt-8 md:mt-10 lg:mt-12 md:pl-10 lg:pl-20">
        <div className="lg:mr-24 max-w-prose mx-auto text-left">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-medium">
            I’m looking forward to hearing from you! If you prefer not to fill out forms, feel free to email me directly and let's talk about the next big thing!
          </p>
          <h3 className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 text-base sm:text-lg md:text-xl lg:text-xl font-semibold">
            <Link href="mailto:iammouniesh@gmail.com" className="hover:underline">
              iammouniesh@gmail.com ↗
            </Link>
          </h3>
        </div>
        <div className="bg-sundark mt-10 md:mt-12 lg:mt-16 w-full max-w-md md:max-w-lg lg:max-w-3xl md:ml-auto">
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-xl">
            <form action="https://formsubmit.co/1317e718d41d16455b9eb4d2fe20d55d" method="POST" className="space-y-4">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_honey" className="hidden" />
              <div className="mb-2 sm:mb-3 md:mb-4">
                <label htmlFor="name" className="block text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-1 sm:mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full p-2 sm:p-3 md:p-4 lg:p-5 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="mb-2 sm:mb-3 md:mb-4">
                <label htmlFor="email" className="block text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-1 sm:mb-2">
                  Email
                </label>
                <div className="flex items-center">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="hello@website.com"
                    className="w-full p-2 sm:p-3 md:p-4 lg:p-5 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
              
              <div className="mb-2 sm:mb-3 md:mb-4">
                <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-1 sm:mb-2">
                  Message Here
                </label>
                <textarea
                  name="text"
                  placeholder="Describe what you need..."
                  className="w-full p-2 sm:p-3 md:p-4 lg:p-5 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-black h-16 sm:h-20 md:h-24 lg:h-32"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-40 bg-black text-white p-2 sm:p-3 md:p-4 lg:p-5 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactPage;