import React from "react";

function Security() {
  const date = new Date();
  return (
    <p className="bg-light w-75 rounded-2 p-3" style={{ margin: "0 auto" }}>
      Contact: <br />
      &emsp;Email: 20110243@student.hcmute.edu.vn (Le Hai Dang)
      <br /> &emsp;Email: 20110215@student.hcmute.edu.vn (Le Dinh Truong)
      <br /> &emsp;Email: 20110744@student.hcmute.edu.vn (Nguyen Van Quoc Tuan)
      <br /> &emsp;Email: 20110684@student.hcmute.edu.vn (Vo Van Nghia)
      <br />
      <br /> Expires: {date.toISOString()}
      <br /> Encryption:
      https://keybase.io/bkimminich/pgp_keys.asc?fingerprint=19c01cb7157e4645e9e2c863062a85a8cbfbdcda
      <br />
      Acknowledgments: https://vostro-cinema.netlify.app/
      <br /> Preferred-Languages: en, es, vn <br />
      Hiring: https://vostro-cinema.netlify.app/recruit
    </p>
  );
}

export default Security;
