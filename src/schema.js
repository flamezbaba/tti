let users = {
  username: String,
  email: String,
  created_at: String,
  ref: String,
};

let investments = {
  uid: String,
  amount: String,
  wallet_address: String,
  alt_amount: String,
  currency: String,
  alt_currency: String,
  returns: String,
  alt_returns: String,
  percentage: String,
  period: String,
  is_withdraw: Boolean,
  is_confirm: Boolean,
  created_at: Date,
  return_date: Date,
  withdraw_date: Date,
};

let withdrawals = {
  uid: String,
  investment_id: String,
  amount: String,
  alt_amount: String,
  currency: String,
  alt_currency: String,
  is_paid: Boolean,
  wallet_address: String,
  created_at: Date,
};

let bonus = {
  uid: String,
  amount: String,
  currency: String,
  type: String,
  is_withdraw: Boolean,
  from_username: String,
  created_at: Date,
  withdraw_date: Date,
};
