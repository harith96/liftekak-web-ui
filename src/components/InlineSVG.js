import React from 'react';
import decode from 'unescape';

function InlineSVG({ image, alt }) {
  //   console.log(image);
  const base64data = Buffer.from(decode(encodeURIComponent(image)), 'latin1').toString('base64');

  return <img src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`} alt={alt} />;
}

export default InlineSVG;
