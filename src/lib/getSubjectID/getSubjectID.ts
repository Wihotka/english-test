export const getSubjectID = (subject:string) => {
  switch (subject) {
    case 'english': return 13;
    default: return null;
  }
};