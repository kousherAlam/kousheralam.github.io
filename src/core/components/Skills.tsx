import { AppConfig } from "@/utils/AppConfig";

export default function Skils() {
  return (
    <>
      <div className="mt-6">
        <p className="flex flex-wrap justify-start gap-2 items-center">
          {AppConfig.skills.map((skill, index) => {
            return (
              <span
                key={index}
                className="text-center min-w-[4em] hover:text-orange-400 border cursor-no-drop hover:border-orange-600 border-slate-600 px-2 py-1 text-xs mb-2 rounded-lg"
              >
                {skill}
              </span>
            );
          })}
        </p>
      </div>
    </>
  );
}
