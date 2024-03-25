import { Footer } from 'flowbite-react';
import { BsInstagram, BsGithub, BsLinkedin, BsWhatsapp } from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className='border border-t-4 border-blue-300'>
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Suba's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='https://www.instagram.com/suba.shini?igsh=ZXBvMXduMGJpaGRm' icon={BsInstagram}/>
            <Footer.Icon href='https://www.linkedin.com/in/subashini-r-12a168242/?originalSubdomain=in' icon={BsLinkedin}/>
            <Footer.Icon href='https://github.com/subashinir05' icon={BsGithub}/>
            <Footer.Icon href='https://wa.me/qr/WLLDAH47FR5ZO1 ' icon={BsWhatsapp}/>

          </div>
        </div>
    </Footer>
  );
}