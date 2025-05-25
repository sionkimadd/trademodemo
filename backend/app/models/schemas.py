from pydantic import BaseModel
from typing import Dict, Any

class StockData(BaseModel):
    symbol: str
    name: str
    price: float
    change: float
    change_percent: float
    
class Portfolio(BaseModel):
    cash: float = 100000.0
    stocks: Dict[str, Dict[str, Any]] = {}
    
class Order(BaseModel):
    symbol: str
    quantity: int
    price: float
    order_type: str = "market"