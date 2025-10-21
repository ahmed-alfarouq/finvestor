import { Transaction } from "plaid";
import { ChartOptions } from "chart.js";
import { Control, FieldError } from "react-hook-form";

// ------------------------------
// Core Enums & Simple Types
// ------------------------------
export type ConnectAccountType = "normal" | "liability";
export type AccountType =
  | "depository"
  | "credit"
  | "loan"
  | "investment"
  | "other";
export type NotificationStatus = "success" | "warning" | "error" | "info";

// ------------------------------
// API Responses
// ------------------------------
declare type AccountsFailedResponse = {
  message: string;
  stack?: string;
  name?: string;
};

declare interface FetchAllAccountsResponse {
  success: boolean;
  successfulCount: number;
  failedCount: number;
  failed: AccountsFailedResponse[];
  accounts: BankAccount[];
}

// ------------------------------
// User & Accounts
// ------------------------------
declare type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  banks: BankProps[];
  savingsGoal: string;
  expensesGoals: ExpensesGoal[];
  savingsGoalAccounts: string[];
  isTwoFactorEnabled: boolean;
};

declare type BankAccount = {
  id: string;
  bankId: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  institutionId: string;
  institutionName: string;
  name: string;
  type: string;
  subtype: string;
};

declare type BankProps = {
  id: string;
  name: string;
  bankId: string;
  userId: string;
  accessToken: string;
  areLiabilityAccounts: boolean;
};

declare type Receiver = {
  firstName: string;
  lastName: string;
};

declare type UpdateUserPasswordParams = {
  userId: string;
  oldPassword: string;
  newPassword: string;
};

declare type UpdateUser2FAParams = {
  userId: string;
  password: string;
  isTwoFactorEnabled: boolean;
};

declare type UpdateUserInfoProps = {
  email: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
};

// ------------------------------
// UI Components Props
// ------------------------------

declare interface ModalWrapperProps {
  children: React.ReactNode;
  close: () => void;
  isOpen: boolean;
  className?: string;
}

declare interface AnimatedCounterProps {
  amount: number;
  prefix?: string;
  decimal?: string;
  decimals?: number;
  className?: string;
}

declare interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  navigation?: boolean;
  pagination?: boolean;
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  breakpoints?: {
    [key: number]: {
      slidesPerView: number | "auto";
      spaceBetween: number;
    };
  };
}

declare interface ConnectBankCardProps {
  user: Session["user"];
  redirectTo?: string;
  className?: string;
}

declare interface BankCardProps {
  accountNumber: string;
  type: string;
  balance: number;
  bankName: string;
  className?: string;
}

declare interface NotAvailableProps {
  title?: string;
  message: string;
  className?: string;
}

declare interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  control: Control<FormValues>;
  disabled?: boolean;
  className?: string;
}

declare interface DateInputProps {
  name: string;
  label: string;
  control: Control<FormValues>;
  error?: FieldError;
  disabled?: boolean;
  endMonth?: Date;
  dateFormat?: string;
}

declare interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date | undefined) => void;
  disabled: boolean;
  endMonth?: Date;
  dateFormat?: string;
}

declare interface FormCardWrapperProps {
  children: React.ReactNode;
  logo: string;
  headerLabel?: string;
  headerText?: string;
  backLinkText: string;
  backLinkHref: string;
  showSocial?: boolean;
}

declare interface CreditCardProps {
  account: BankAccount;
  userName: string;
  showBalance?: boolean;
}

declare interface BankInfoProps {
  account: BankAccount;
  id?: string;
  type: "full" | "card";
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare interface PlaidLinkProps {
  user: User;
  variant?:
    | "ghost"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "link";
  title?: string;
  icon?: string;
  accountType?: ConnectAccountType;
  disabled: boolean;
  className?: string;
  handleSuccess?: () => void;
  handleExit?: (error: null | PlaidLinkError) => void;
  onError?: (error: string) => void;
  onClick?: () => void;
}

declare interface CircledProgressBarProps {
  targetAmount: number;
  achievedAmount: number;
}

declare interface GoalsBoxProps {
  title: string;
  targetAmount: number;
  achievedAmount: number;
  date: Date;
  className?: string;
}

declare interface EmptyGoalsBoxProps {
  title: string;
  message?: string;
  selectedAccounts?: boolean;
  date: Date;
  className?: string;
  showButton?: boolean;
}

declare interface BalanceCardProps {
  id: string;
  bankId: string;
  userId: string;
  type: string;
  subtype: string;
  name: string;
  accountNumber: string;
  totalAmount: number;
}

declare interface ExpensesGoal {
  id: string;
  userId: string;
  user: User;
  date: string;
  amount: string;
  category: string;
}
declare interface RecentTransactionsProps {
  accounts: BankAccount[];
  transactions: Transaction[];
  id: string;
}

declare interface TransactionsTabProps {
  value: string;
  className?: string;
  transactions: Transaction[];
}

declare interface TransactionHistoryTableProps {
  transactions: Transaction[];
  page: number;
}

declare interface TransactionTableProps {
  hasMore: boolean;
  loadMore: () => void;
  isLoadingMore: boolean;
  transactions: Transaction[];
}

declare interface SelectAccountFormProps {
  userId: string;
  checkedAccounts: string[];
  accounts: BankAccount[];
}

declare interface TransferFormInputProps {
  name: string;
  title: string;
  label: string;
  type?: string;
  placeholder: string;
  control: Control<FormValues>;
  disabled: boolean;
}

declare interface TransferFormSelectProps {
  accounts: BankAccount[];
  name: string;
  title: string;
  description: string;
  placeholder: string;
  control: Control<FormValues>;
  disabled: boolean;
}

declare interface CategoryProps {
  category: CategoryCount;
}

interface BarChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  stack?: string;
  order?: number;
}

interface BarChartProps {
  labels: string[];
  datasets: BarChartDataset[];
  options?: Partial<ChartOptions<"bar">>;
  className?: string;
}

declare interface DoughnutChartProps {
  accounts: BankAccount[];
}

declare interface BankTabItemProps {
  account: BankAccount;
  id: string;
  className?: string;
}

declare interface NotificationAlertProps {
  onClose?: () => void;
  title: string;
  message: string;
  status?: NotificationStatus;
  duration?: number;
}

declare interface Loan {
  name: string;
  accountId: string;
  lastPaymentAmount: number;
  lastPaymentDate: string;
  nextPaymentDueDate: string;
  nextMonthlyPayment: number;
  isOverdue: boolean;
  /**
   * Year to date total paid
   * ytd_interest_paid + ytd_principal_paid
   */
  ytdTotalPaid: number;
}

// ------------------------------
// Actions
// ------------------------------
declare interface CreateTransactionProps {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}
declare interface exchangePublicTokenProps {
  user: User;
  publicToken: string;
  accountType: ConnectAccountType;
  institutionName: string | null;
}

declare interface createBankProps {
  name: string;
  bankId: string;
  userId: string;
  accessToken: string;
  areLiabilityAccounts: boolean;
}
