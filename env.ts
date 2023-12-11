
const draftUI = process.env.URL_UNDER_TEST || `https://www.daft.ie/`

type envReturnType = {
  URL_UNDER_TEST: string
}

export function envVariable(): envReturnType {
  return {
    URL_UNDER_TEST: draftUI
  }
}
