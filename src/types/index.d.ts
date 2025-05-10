import { FieldError } from "react-hook-form";
import { Control } from "react-hook-form";

declare type ConnectAccountType = "normal" | "liability";

// ========================================
declare type User = {
  id: string;
  email: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  role: string;
  bankAccounts: BankAccountProps[];
  savingsGoal: string;
  expensesGoals: ExpensesGoal[];
  savingsGoalAccounts: string[];
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
  sharableId: string;
};

declare type Transaction = {
  id: string;
  name: string;
  paymentChannel: string;
  accountId: string;
  amount: number;
  pending: boolean;
  date: string;
  image?: string | null;
  category: PersonalFinanceCategory;
  category_icon?: string;
};

declare type BankAccountProps = {
  id: string;
  userId: string;
  bankId: string;
  accountId: string;
  accessToken: string;
  fundingSourceUrl: string;
  sharableId: string;
};

declare type AccountTypes =
  | "depository"
  | "credit"
  | "loan"
  | "investment"
  | "other";

declare type Receiver = {
  firstName: string;
  lastName: string;
};

declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

declare type AddFundingSourceParams = {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
};

declare type NewDwollaCustomerParams = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

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
declare interface BankCardProps {
  accountNumber: string;
  type: string;
  balance: number;
  bankName: string;
  className?: string;
}

declare interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  control: Control<FormValues>;
  disabled?: boolean;
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
  dwollaCustomerId?: string;
  className?: string;
  handleSuccess?: () => void;
  handleExit?: () => void;
  onClick?: () => void;
}

declare interface TotlaBalanceBoxProps {
  accounts: BankAccount[];
  totalAvailableBalance: number;
}

declare interface CircledProgressBarProps {
  targetAmount: number;
  achievedAmount: number;
}

declare interface GoalsBoxProps {
  title: string;
  targetAmount: number;
  achievedAmount: number;
  thisMonthTarget: number;
  date: Date;
  className?: string;
}

declare interface EmptyGoalsBoxProps {
  title: string;
  message?: string;
  selectedAccounts?: boolean;
  date: Date;
  className?: string;
}

declare interface BalanceCardProps {
  id: string;
  bankId: string;
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

declare interface TransactionHistoryTableProps {
  transactions: Transaction[];
  page: number;
}

declare interface TransactionTableProps {
  transactions: Transaction[];
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

declare interface PaymentTransferFormProps {
  accounts: BankAccount[];
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

// Actions
declare interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSourceName: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _links: object; // Dwolla On Demand Authorization Link
}

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
  publicToken: string;
  user: User;
  accountType: ConnectAccountType;
}

declare interface createBankAccountProps {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  sharableId: string;
}

declare interface BankTabItemProps {
  account: BankAccount;
  id: string;
  className?: string;
}

export type NotificationStatus = "success" | "warning" | "error" | "info";

declare interface NotificationAlertProps {
  onClose?: () => void;
  title: string;
  message: string;
  status?: NotificationStatus;
  duration?: number;
}
