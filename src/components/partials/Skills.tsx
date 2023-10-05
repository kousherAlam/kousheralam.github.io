export default function Skils() {
  const my_skills = [
    "Javascript",
    "Nodejs",
    "OAuth",
    "Active Directory",
    "Svelte",
    "React",
    "AWS",
    "Terraform",
    "Microservice",
    "Docker",
    "Kubernetes",
    "Cyber Security",
  ];

  return (
    <>
      <div className="mt-6">
        <p className="flex flex-wrap space-x-2">
          {my_skills.map((skill, index) => {
            return (
              <span
                key={index}
                className="first:ml-2 border hover:bg-orange-200 hover:text-orange-800 cursor-no-drop border-orange-400 px-2 py-1 text-sm mb-2 rounded-lg"
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
