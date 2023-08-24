"use client"

import { useState, Fragment } from 'react'
import { Switch } from '@headlessui/react'

interface SwitchToggleProps {
    label: string
    className?: string
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>
    enabled: boolean
}

export default function SwitchToggle({ label, className = "", enabled, setEnabled }: SwitchToggleProps) {

    return (
        <Switch.Group>
            <div className={`${className} flex items-center`}>
                <Switch.Label className="mr-3 font-semibold">{label}</Switch.Label>
                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? 'bg-primary-500' : 'bg-gray-200'
                        } relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2`}
                >
                    <span
                        className={`${enabled ? `translate-x-7` : `translate-x-1`
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                </Switch>
            </div>
        </Switch.Group>
    )
}
