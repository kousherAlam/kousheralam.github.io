import { Section } from "@/components/core";

import { AppConfig } from "@/utils/AppConfig";

const Footer = () => (
  <Section>
    <div className="border-t border-gray-600 pt-5">
      <div className="grid grid-cols-2">
        <div>
          <div className="text-sm text-gray-200">
            © Copyright {new Date().getFullYear()} by {AppConfig.site_name}.
            Built with ♥ by{" "}
            <a
              className="text-cyan-400 hover:underline"
              href="https://creativedesignsguru.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              CreativeDesignsGuru
            </a>
            .
          </div>
        </div>
        <div>
          <div className="text-right text-sm">
            <span className="text-white font-bold">Commit:</span>
            &nbsp;
            <span className="text-cyan-400 hover:underline uppercase">
              {import.meta.env.COMMIT_HASH}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

export { Footer };
