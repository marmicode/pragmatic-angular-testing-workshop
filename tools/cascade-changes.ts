import { execSync } from 'child_process';
import { config } from './cook/config.ts';
const { exercises } = config;

async function main(args: string[]) {
  const [startProject = computeExerciseProjects(exercises[0].id).starter] =
    args;

  const exerciceIds = exercises.map((exercise) => exercise.id);

  const projects = exerciceIds
    .map((exerciseId) => {
      const { starter, solution } = computeExerciseProjects(exerciseId);
      return [starter, solution];
    })
    .flat();

  const startIndex = projects.indexOf(startProject);
  if (startIndex === -1) {
    console.error(`Project ${startProject} not found`);
    process.exit(1);
  }

  const filteredProjects = projects.slice(startIndex);
  const pairwisedProjects = pairwise(filteredProjects);

  for (const [source, destination] of pairwisedProjects) {
    execSync(`pnpm nx run tools:clone-changes ${source} ${destination}`, {
      stdio: 'inherit',
    });
  }
}

function computeExerciseProjects(exerciseId: string) {
  return {
    starter: `${exerciseId}-starter`,
    solution: `${exerciseId}-solution`,
  };
}

function pairwise<T>(list: Array<T>): Array<[T, T]> {
  return list.reduce(
    (acc, project, index) => {
      if (index > 0) {
        acc.push([list[index - 1], project]);
      }
      return acc;
    },
    [] as [T, T][],
  );
}

main(process.argv.slice(2));
