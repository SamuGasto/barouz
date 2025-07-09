"use client"
import React from 'react'
import { FormControl } from '../ui/form';
import { Input } from '../ui/input';
import { Eye, EyeOff, Lock } from 'lucide-react';
interface PasswordInputProps {
    field: any;
}

function PasswordInput({ field }: PasswordInputProps) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    return (
        <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <FormControl>
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9 pr-10"
                    disabled={isLoading}
                    autoComplete="current-password"
                    value={field.value}
                    onChange={field.onChange}
                />
            </FormControl>
            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                ) : (
                    <Eye className="h-4 w-4" />
                )}
            </button>
        </div>

    )
}

export default PasswordInput