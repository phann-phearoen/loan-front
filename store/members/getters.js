export default {
  getAllMembers: (state) => state.allMembers || [],
  getThisMember: (state) => state.thisMember,
  getOneMember: (state) => state.oneMember,
  getMemberToDeoposit: (state) => state.memberToDeposit,
  getMemberToLoan: (state) => state.memberToLoan,
  getLoanObject: (state) => state.loanObject,
}
