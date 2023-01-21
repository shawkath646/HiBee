import Image from "next/image";
import { signIn } from "next-auth/react";
import logoGoogle from '../../public/assets/google-logo-9808.png';
import logoFacebook from '../../public/assets/logo-facebookpng-32204.png';

export default function CustomProviderButton() {
    return (
        <div className="space-y-2">
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center mx-4 mb-0 text-gray-600">Or</p>
            </div>
            <button type="button" onClick={() => signIn('google')} className="flex items-center justify-center rounded-sm space-x-4 py-1 w-full border border-gray-200 dark:border-none hover:text-blue-500 transition-all dark:hover:text-gray-400">
              <p>Signin with google</p>
              <Image src={logoGoogle.src} height="20" width="20" />
            </button>
            <button type="button" onClick={() => signIn('facebook')} className="flex items-center justify-center rounded-sm space-x-4 py-1 w-full border border-gray-200 dark:border-none hover:text-blue-500 transition-all dark:hover:text-gray-400">
              <p>Signin with facebook</p>
              <Image src={logoFacebook.src} height="20" width="20" />
            </button>
        </div>
    );
}