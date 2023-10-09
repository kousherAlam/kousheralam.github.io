interface CertificateProp {
  title: string;
  badge: string;
  authority: {
    name: string;
    link: string;
  };
  verificationLink: string;
  issued: string;
}

export default function Certificate(data: CertificateProp) {
  return (
    <div className="bg-slate-800 w-full">
      <div className="grid grid-cols-12">
        <div className="flex justify-center items-center col-span-3 bg-slate-700 py-2 px-1">
          <img src={data.badge} alt="Google Verification badge" />
        </div>
        <div className="col-span-9 px-3 py-4 flex flex-col justify-between">
          <div>
            <h4 className="text-lg ">{data.title}</h4>
            <ul className="list-none">
              <li>
                <p className="mb-0 mt-1 text-xs text-gray-100">
                  <span>
                    <a href={data.authority.link} target="_blank">
                      {" "}
                      {data.authority.name}{" "}
                    </a>
                  </span>
                </p>
              </li>
              <li>
                <p className="mb-0 mt-1 text-xs text-gray-100">
                  <span>Issued On</span>
                  <span>&nbsp;-&nbsp;</span>
                  <span>{data.issued}</span>
                </p>
              </li>
            </ul>
          </div>
          <div>
            <a
              className=" text-orange-500 hover:text-orange-400 visited:text-orange-600"
              href={data.verificationLink}
              target="_blank"
            >
              Verify Certificate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
