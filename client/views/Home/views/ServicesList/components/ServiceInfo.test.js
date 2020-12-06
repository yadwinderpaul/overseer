import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ServiceInfo from './ServiceInfo'

describe('ServiceInfo component', () => {
  let onServiceEditMock
  let onServiceDeleteMock
  const SERVICE = {
    id: 'TEST_SERVICE_ID',
    name: 'TEST_SERVICE',
    status: true
  }

  beforeEach(() => {
    onServiceEditMock = jest.fn()
    onServiceDeleteMock = jest.fn()
    render(
      <ServiceInfo
        service={SERVICE}
        onEditClick={onServiceEditMock}
        onDeleteClick={onServiceDeleteMock}
      />
    )
  })

  it('loads and displays service name', async () => {
    await waitFor(() => screen.getByText(SERVICE.name))
    expect(screen.getByText(SERVICE.name)).toBeInTheDocument()
  })

  it('calls onEditClick when edit icon is clicked', async () => {
    fireEvent.click(screen.getByLabelText('edit'))
    expect(onServiceEditMock.mock.calls.length).toBe(1)
  })

  it('does not call onDeleteClick directly when delete icon is clicked', async () => {
    fireEvent.click(screen.getByLabelText('delete'))
    expect(onServiceDeleteMock.mock.calls.length).toBe(0)
  })

  it('calls onDeleteClick after confirming', async () => {
    fireEvent.click(screen.getByLabelText('delete'))
    expect(onServiceDeleteMock.mock.calls.length).toBe(0)
    fireEvent.click(screen.getByText('Yes'))
    expect(onServiceDeleteMock.mock.calls.length).toBe(1)
  })
})
