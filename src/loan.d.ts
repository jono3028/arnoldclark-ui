
export type IPaymentSchedule = {
  dueDate: string,
  ammount: number,
  note?: string,
}

export type ILoanTerms = {
  loanAmount: number,
  deposit: number,
  loanTerm: number,
  loanInception: Date, 
}

export type ICarSearchRes ={
  stockReference: string,
  url: string,
  enquiryUrl: string,
  isReserved: true,
  isAvailableSoon: false,
  isAwaitingImages: false,
  title: {
    name: string,
    variant: string
  },
  photos: [string[]],
  thumbnails: [string[]],
  imageCount: number,
  branch: {
    name: string,
    url: string,
    distance?: number,
    merchantId: number,
    providerId: number
  },
  make: string,
  model: string,
  citnowVideo: null,
  salesInfo: {
    pricing: {
      cashPricePrefix: string,
      cashPrice: number
    },
    summary: string[],
    highlightedFeature?: string
  }
}