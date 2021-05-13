const initialState = {
  studyName: "",
  briefAbstract: "",
  detailedDescription: "",
  duration: "",
  creditsResearch: "",
  researcher: "", 
  instructor: "1",
  approvalCode: "",
  expireDate: "", //yyyy-mm-dd
  approved: true,
  activeStudy: true,
  minAge: "",
  maxAge: "",
  gender: [],
  race: [],
  ethnicity: "",
  appointment: ""
}

export default function addNew(state = initialState, action) {
  switch (action.type) {
    case 'addNew/addInfo':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}