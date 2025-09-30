type IsUserRegisteredProps = {
  email: string
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

type PostAuthProps = {
  email: string
  password: string
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

type SetTwoFactorAuthenticationProps = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

type CheckTwoFactorAuthenticationProps = {
  code: string
  loading: React.Dispatch<React.SetStateAction<boolean>>
}