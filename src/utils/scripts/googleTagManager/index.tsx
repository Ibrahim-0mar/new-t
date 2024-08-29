import Script, { ScriptProps } from 'next/script';

const GoogleTagManager = ({strategy}:{strategy?:ScriptProps["strategy"]}) => {
  return (
    <Script
      async
      id="googleTagManager"
      strategy={strategy ||"lazyOnload"}
      dangerouslySetInnerHTML={{
        __html: `
            (function(w,d,s,l,){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://data.travolic.com/dataUtils.js'+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer');
          `,
      }}
    />
  );
};

export default GoogleTagManager;
