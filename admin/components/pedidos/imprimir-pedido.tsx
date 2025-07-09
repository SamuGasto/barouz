"use client"

import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { useReactToPrint } from 'react-to-print';
import { useRef, forwardRef, useCallback } from 'react';
import type { Database } from "@/types/supabase"
import { UsuarioRow } from "@/types/tipos_supabase_resumidos"
import { TodosLosPedidos } from "@/types/res_pedidos_final"

// Componente para el contenido imprimible
const ContenidoImpresion = forwardRef<HTMLDivElement, { pedido_final: TodosLosPedidos["pedido_final"], usuario: UsuarioRow | undefined }>(
    ({ pedido_final, usuario }, ref) => {
        const formatCurrency = (value: number | null | undefined) => {
            if (value == null) return '$0';
            return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
        }

        const formatearFechaHora = (fechaHora: string) => {
            const date = new Date(fechaHora);
            return date.toLocaleString('es-CL', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        }

        return (
            <div ref={ref} className="p-4 max-w-md mx-auto bg-white">
                <style>
                    {`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        .printable, .printable * {
                            visibility: visible;
                        }
                        .printable {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                        }
                        .no-print {
                            display: none !important;
                        }
                    }
                    `}
                </style>
                <div className="printable p-4 border border-gray-200 rounded-lg">
                    <div className="text-center mb-4">
                        <h1 className="text-xl font-bold">Bar Ouz</h1>
                        <p className="text-sm text-gray-600">Pedido #{pedido_final.informacion.id}</p>
                        <p className="text-sm text-gray-600">
                            {pedido_final.informacion.fecha_hora && formatearFechaHora(pedido_final.informacion.fecha_hora)}
                        </p>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between mb-2">
                            <span className="font-medium">Cliente:</span>
                            <span>{usuario?.nombre || 'Cliente sin nombre'}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="font-medium">Estado:</span>
                            <span>{pedido_final.informacion.estado}</span>
                        </div>
                    </div>

                    <div className="border-t border-b border-gray-200 py-2 my-4">
                        <h2 className="font-bold mb-2">Detalle del pedido</h2>
                        {pedido_final.pedidos?.map((item, idx) => (
                            <div key={idx} className="mb-2">
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        {item.informacion.cantidad}x {item.producto?.nombre || 'Producto'}
                                    </span>
                                    <span>{formatCurrency(item.informacion.precio_final)}</span>
                                </div>
                                {item.extras && item.extras.length > 0 && (
                                    <div className="ml-4 text-sm text-gray-600">
                                        {item.extras.map((extra, idx) => (
                                            <div key={idx} className="flex justify-between">
                                                <span>+ {extra.extra?.nombre}</span>
                                                <span>+{formatCurrency(extra.extra?.precio)}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 text-right">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span>{formatCurrency(pedido_final.informacion.total_final)}</span>
                        </div>
                    </div>


                    <div className="mt-4 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                        <p>Gracias por su compra</p>
                        <p>Bar Ouz - {new Date().getFullYear()}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 text-center text-xs text-gray-500 no-print">
                        <p>Este es un comprobante de pedido. Por favor, guárdelo para futuras referencias.</p>
                    </div>
                </div>
            </div>
        );
    }
);
ContenidoImpresion.displayName = 'ContenidoImpresion';

export function BotonImprimirPedido({ pedido_final, usuario }: { pedido_final: TodosLosPedidos["pedido_final"], usuario: UsuarioRow | undefined }) {
    const componentRef = useRef<HTMLDivElement>(null);

    // Función para manejar la impresión
    const handlePrint = useCallback(() => {
        if (!componentRef.current) return;
        
        const printWindow = window.open('', '', 'width=800,height=600');
        if (!printWindow) return;
        
        // Estilos para la impresión
        const printStyles = `
            <style>
                @page { 
                    size: auto;
                    margin: 5mm;
                }
                @media print {
                    body { 
                        -webkit-print-color-adjust: exact; 
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    .no-print {
                        display: none !important;
                    }
                    @page :footer { display: none; }
                    @page :header { display: none; }
                }
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.5;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .printable {
                    width: 100%;
                    max-width: 80mm;
                    margin: 0 auto;
                    padding: 10px;
                    box-sizing: border-box;
                }
                .text-center {
                    text-align: center;
                }
                .font-bold {
                    font-weight: bold;
                }
                .border-t {
                    border-top: 1px solid #e5e7eb;
                }
                .border-b {
                    border-bottom: 1px solid #e5e7eb;
                }
                .py-2 {
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                }
                .my-4 {
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }
                .mb-2 {
                    margin-bottom: 0.5rem;
                }
                .flex {
                    display: flex;
                }
                .justify-between {
                    justify-content: space-between;
                }
                .text-sm {
                    font-size: 0.875rem;
                }
                .text-xs {
                    font-size: 0.75rem;
                }
                .text-lg {
                    font-size: 1.125rem;
                }
                .text-xl {
                    font-size: 1.25rem;
                }
                .text-gray-600 {
                    color: #4b5563;
                }
                .text-gray-700 {
                    color: #374151;
                }
                .bg-white {
                    background-color: #fff;
                }
                .rounded-lg {
                    border-radius: 0.5rem;
                }
                .p-4 {
                    padding: 0.5rem;
                }
                .ml-4 {
                    margin-left: 1rem;
                }
                .mt-4 {
                    margin-top: 1rem;
                }
                .pt-4 {
                    padding-top: 1rem;
                }
            </style>
        `;
        
        // Contenido a imprimir
        const content = componentRef.current.innerHTML;
        
        // Escribir el documento de impresión
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Pedido #${pedido_final.informacion.id}</title>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    ${printStyles}
                    <style>
                        @media print {
                            @page { 
                                size: 80mm auto;
                                margin: 0;
                            }
                            html, body {
                                width: 80mm;
                                margin: 0 auto;
                            }
                        }
                    </style>
                </head>
                <body onload="window.print();window.onafterprint=function(){window.close();};">
                    <div class="printable">
                        ${content}
                    </div>
                </body>
            </html>
        `);
        
        printWindow.document.close();
    }, [pedido_final.informacion.id]);

    return (
        <>
            <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-xs"
                onClick={handlePrint}
            >
                <FileText className="h-3 w-3 mr-1" />
                Imprimir
            </Button>
            
            {/* Contenido oculto que se usará para la impresión */}
            <div style={{ position: 'absolute', left: '-9999px', width: '80mm' }}>
                <ContenidoImpresion 
                    ref={componentRef} 
                    pedido_final={pedido_final} 
                    usuario={usuario} 
                />
            </div>
        </>
    );
}
