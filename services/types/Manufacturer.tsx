type GetManufacturer = {
  id: string
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

type GetManufacturers = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

type UpdateManufacturer = {
  id: string
  name: string
}

type CreateManufacturer = {
  name: string
}
