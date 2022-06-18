export default {
  set_all_members(state, payload) {
    state.allMembers = payload
  },
  set_this_member(state, payload) {
    state.thisMember = payload
  },
  set_one_member(state, payload) {
    state.oneMember = payload
  },
  set_member_to_deposit(state, payload) {
    state.memberToDeposit = payload
  },
  set_member_to_loan(state, payload) {
    state.memberToLoan = payload
  },
  set_loan_object(state, payload) {
    state.loanObject = payload
  },
}
