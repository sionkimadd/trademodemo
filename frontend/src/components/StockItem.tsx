import { DetailedStockInfo } from '../hooks/usePortfolio';
import { formatCurrency, getReturnRateColor, formatPercent } from '../utils/formatters';

interface StockItemProps {
    stock: DetailedStockInfo;
    onOrder: (isBuy: boolean, symbol: string, quantity: number) => void;
    orderLoading: boolean;
}

interface StockInfoRowProps {
    label: string;
    value: string | React.ReactNode;
    className?: string;
}

const StockInfoRow = ({ label, value, className = "text-gray-300" }: StockInfoRowProps) => (
    <div>
        <div className="text-gray-500">{label}</div>
        <div className={className}>{value}</div>
    </div>
);

export default function StockItem({ stock, onOrder, orderLoading }: StockItemProps) {
    const handleOrder = (isBuy: boolean) => {
        const input = document.getElementById(`qty-${stock.symbol}`) as HTMLInputElement;
        const qty = parseInt(input.value) || 1;
        onOrder(isBuy, stock.symbol, qty);
    };

    const OrderButton = ({ isBuy }: { isBuy: boolean }) => (
        <button 
            className={`btn btn-xs h-7 border-none text-white rounded-md px-1 text-xs ${
                isBuy ? 'bg-[#4db6ac] hover:bg-[#3da59b]' : 'bg-[#e75f77] hover:bg-[#d94c65]'
            }`}
            onClick={() => handleOrder(isBuy)}
            disabled={orderLoading}
        >
            {isBuy ? 'Buy' : 'Sell'}
        </button>
    );

    return (
        <div className="bg-[#232939] border-none rounded-lg p-3 mb-2 text-xs">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-100 truncate" title={stock.name || stock.symbol}>
                    {stock.symbol} {stock.name && <span className="text-gray-400">({stock.name})</span>}
                </span>
                <span className="text-sm text-gray-200 font-semibold">${formatCurrency(stock.market_value)}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-x-2 mb-2">
                <StockInfoRow label="Quantity" value={`${stock.quantity} shares`} />
                <StockInfoRow label="Avg Price" value={`$${formatCurrency(stock.avg_price)}`} />
                <StockInfoRow label="Current" value={`$${formatCurrency(stock.current_price)}`} />
            </div>
            
            <div className="grid grid-cols-2 gap-x-2 mb-2">
                <StockInfoRow 
                    label="P&L" 
                    value={`$${formatCurrency(stock.profit_loss)}`}
                    className={getReturnRateColor(stock.profit_loss)}
                />
                <StockInfoRow 
                    label="ROI" 
                    value={formatPercent(stock.roi)}
                    className={getReturnRateColor(stock.roi)}
                />
            </div>
            
            <div className="flex items-center mt-2">
                <input 
                    type="number" 
                    min="1" 
                    defaultValue="1" 
                    className="input input-xs bg-[#141824] text-gray-100 border-none w-14 h-7 rounded-md mr-2 text-xs" 
                    id={`qty-${stock.symbol}`}
                />
                <div className="grid grid-cols-2 gap-2 flex-1">
                    <OrderButton isBuy={true} />
                    <OrderButton isBuy={false} />
                </div>
            </div>
        </div>
    );
} 