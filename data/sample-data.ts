// Sample data types and constants for the Artistry project

export interface User {
  id: string
  name: string
  email: string
  age: number
  createdAt: Date
}

export interface FormConfig {
  fields: {
    name: {
      label: string
      placeholder: string
      required: boolean
    }
    email: {
      label: string
      placeholder: string
      required: boolean
    }
    age: {
      label: string
      placeholder: string
      required: boolean
    }
  }
}

export const FORM_CONFIG: FormConfig = {
  fields: {
    name: {
      label: 'Name',
      placeholder: 'Enter your name',
      required: true,
    },
    email: {
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
    },
    age: {
      label: 'Age',
      placeholder: 'Enter your age',
      required: true,
    },
  },
}

export const SAMPLE_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 25,
    createdAt: new Date('2024-01-02'),
  },
] 