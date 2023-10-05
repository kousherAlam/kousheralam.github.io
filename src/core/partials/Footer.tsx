import { AppConfig } from "@/utils/AppConfig";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div>
      <div className="border-t border-gray-600 pt-5">
        <div className="grid grid-cols-2">
          <div>
            <div className="text-sm text-gray-200">
              <p>
                © Copyright {year} by {AppConfig.site_name}
              </p>
            </div>
          </div>
          <div>
            <div className="text-right text-sm">
              <span className="text-white font-bold">Commit:</span>
              &nbsp;
              <a
                href={`https://github.com/kousherAlam/kousheralam.github.io/tree/${
                  import.meta.env.COMMIT_HASH
                }`}
                className="text-cyan-400 hover:underline"
              >
                {((import.meta.env.COMMIT_HASH || "") as string).substring(
                  0,
                  7
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
