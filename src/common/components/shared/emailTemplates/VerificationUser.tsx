type Props = {
  code: string
}

export const VerificationUserTemplate = ({ code }: Props) => (
  <div>
    <p>
      Код подтверждения: <h2>{code}</h2>
    </p>

    <p>
      <a href={`${process.env.PROJECT_URL}/api/auth/verify?code=${code}`}>
        Подтвердить регистрацию
      </a>
    </p>
  </div>
)
