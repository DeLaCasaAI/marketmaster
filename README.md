Original index.html:

--------------------


<!DOCTYPE html>
<html lang="en">
<head><script>window.huggingface={variables:{"SPACE_CREATOR_USER_ID":"6317a9f1aea37e1333df5401"}};</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title data-translate="appTitle">MarketMaster - Farmer's Market Sales Tracker</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body class="bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
        <!-- Header -->
        <header class="mb-8">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold text-green-700" data-translate="headerTitle">
                        <i class="fas fa-store mr-2"></i>MarketMaster
                    </h1>
                    <p class="text-gray-600" data-translate="headerSubtitle">Track your farmer's market sales with ease</p>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="bg-white p-3 rounded-lg shadow-sm">
                        <span class="text-gray-500" data-translate="todaysSalesLabel">Today's Sales:</span>
                        <span class="font-bold text-green-600 ml-2" id="totalSales">$0.00</span>
                    </div>
                    <div class="relative inline-block text-left mr-4">
                        <button id="languageToggleBtn" class="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                            <span data-translate="languageButtonText">English</span>
                        </button>
                    </div>
    <button id="menuButton" type="button" class="inline-flex justify-center items-center w-full rounded-md bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" aria-expanded="false" aria-haspopup="true">
        <i class="fas fa-bars mr-2"></i> Menu
    </button>
    
    <div id="menuDropdown" class="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="menuButton" tabindex="-1">
        <div class="py-1" role="none">
            <a href="#" id="newEventBtn" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600" role="menuitem" tabindex="-1" data-translate="newEventButton">
                <i class="fas fa-plus mr-2"></i> New Event
            </a>
            <div class="border-t border-gray-200 my-1"></div>
            <div class="relative group">
                <a href="#" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600" role="menuitem" tabindex="-1" data-translate="reportsMenu">
                    <i class="fas fa-chart-bar mr-2"></i> Reports
                </a>
                <div class="ml-4 hidden group-hover:block">
                    <a href="#" id="todaysSaleReportBtn" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600" role="menuitem" tabindex="-1" data-translate="todaysSaleReport">
                        <i class="fas fa-calendar-day mr-2"></i> Today's Sale
                    </a>
                </div>
            </div>
            <a href="#" id="exportDataBtn" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600" role="menuitem" tabindex="-1">
                <i class="fas fa-download mr-2"></i> Export Data
            </a>
            <a href="#" id="importDataBtn" class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600" role="menuitem" tabindex="-1">
                <i class="fas fa-upload mr-2"></i> Import Data
            </a>
        </div>
    </div>
</div>
                    </button>
                </div>
            </div>
        </header>
        <!-- Event Info Section -->
        <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 class="text-2xl font-semibold text-gray-800" id="eventName"></h2>
                    <p class="text-gray-600" id="eventLocation"></p>
                </div>
                <div class="mt-2 md:mt-0">
                    <p class="text-gray-600 font-medium" id="eventDate"></p>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left Column - Products & Discounts -->
            </div>

            <!-- Middle Column - Sales Interface -->
            <div class="lg:col-span-2">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-semibold text-gray-800" data-translate="currentSaleTitle">
                            <i class="fas fa-cash-register mr-2 text-blue-500"></i>Current Sale
                        </h2>
                        <div class="flex space-x-2">
                            <button id="clearSaleBtn" data-translate="clearSaleButton" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded">
                                Clear
                            </button>
                            <button id="completeSaleBtn" data-translate="completeSaleButton" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                                Complete Sale
                            </button>
                        </div>
                    </div>

                    <!-- Receipt Area -->
                    <div class="border border-gray-200 rounded-lg p-4 mb-6 min-h-40" id="receiptArea">
                        <div class="text-center text-gray-500 italic py-8" id="emptyReceiptMessage" data-translate="emptyReceiptMessage">
                            Add items to begin a sale
                        </div>
                        <div id="receiptItems" class="hidden">
                            <!-- Receipt items will be added here dynamically -->
                        </div>
                        <div id="receiptTotals" class="hidden border-t border-gray-200 mt-4 pt-4">
                            <div class="flex justify-between font-semibold">
                                <span data-translate="subtotalLabel">Subtotal:</span>
                                <span id="subtotalAmount">$0.00</span>
                            </div>
                            <div class="flex justify-between text-green-600">
                                <span data-translate="discountsLabel">Discounts:</span>
                                <span id="discountAmount">-$0.00</span>
                            </div>
                            <div class="flex justify-between text-lg font-bold mt-2">
                                <span data-translate="totalLabel">Total:</span>
                                <span id="totalAmount">$0.00</span>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Add Buttons -->
                    <div class="mb-6">
                        <h3 class="text-sm font-semibold text-gray-500 mb-2" data-translate="quickAddTitle">QUICK ADD</h3>
                        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2" id="quickAddButtons">
                            <!-- Quick add buttons will be added here dynamically -->
                        </div>
                    </div>

                    <!-- Payment Method -->
                    <div class="mb-6">
                        <h3 class="text-sm font-semibold text-gray-500 mb-2" data-translate="paymentMethodTitle">PAYMENT METHOD</h3>
                        <div class="flex space-x-2">
                            <button class="payment-method-btn bg-green-100 text-green-800 px-3 py-2 rounded flex-1" data-method="cash" data-translate="paymentCash">
                                <i class="fas fa-money-bill-wave mr-2"></i> Cash
                            </button>
                            <button class="payment-method-btn bg-blue-100 text-blue-800 px-3 py-2 rounded flex-1" data-method="transfer" data-translate="paymentCard">
                                <i class="fas fa-credit-card mr-2"></i> Transfer/Transferencia
                            </button>
                            <button class="payment-method-btn bg-purple-100 text-purple-800 px-3 py-2 rounded flex-1" data-method="nequi" data-translate="paymentVenmo">
                                <i class="fab fa-vimeo-v mr-2"></i> Nequi
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Sales History -->
                <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4" data-translate="salesHistoryTitle">
                        <i class="fas fa-history mr-2 text-purple-500"></i>Today's Sales
                    </h2>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" data-translate="tableHeaderTime">Time</th>
                                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" data-translate="tableHeaderItems">Items</th>
                                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" data-translate="tableHeaderPayment">Payment</th>
                                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" data-translate="tableHeaderTotal">Total</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200" id="salesHistory">
                                <tr>
                                    <td colspan="4" class="px-4 py-4 text-center text-gray-500 italic" data-translate="noSales">No sales recorded yet</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-1 space-y-6">
                <!-- Product List -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-800" data-translate="productsTitle">
                            <i class="fas fa-box-open mr-2 text-green-600"></i>Products
                        </h2>
                        <button id="addProductBtn" class="text-green-600 hover:text-green-800">
                            <i class="fas fa-plus-circle"></i>
                        </button>
                    </div>
                    <div class="space-y-3" id="productList">
                        <div class="text-gray-500 italic" data-translate="noProducts">No products added yet</div>
                    </div>
                </div>

                <!-- Discount Packs -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-800" data-translate="discountPacksTitle">
                            <i class="fas fa-tags mr-2 text-yellow-500"></i>Discount Packs
                        </h2>
                        <button id="addDiscountBtn" class="text-yellow-600 hover:text-yellow-800">
                            <i class="fas fa-plus-circle"></i>
                        </button>
                    </div>
                    <div class="space-y-3" id="discountList">
                        <div class="text-gray-500 italic" data-translate="noDiscounts">No discount packs created yet</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modals -->
    <!-- Add Product Modal -->
    <div id="productModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md slide-in">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold" data-translate="addProductModalTitle">Add New Product</h3>
                <button id="closeProductModal" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="productForm">
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="productName" data-translate="productNameLabel">Product Name</label>
                    <input type="text" id="productName" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-gray-700 mb-2" for="productPrice" data-translate="productPriceLabel">Price ($)</label>
                        <input type="number" step="0.01" id="productPrice" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2" for="productCost" data-translate="productCostLabel">Cost ($)</label>
                        <input type="number" step="0.01" id="productCost" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="productCategory" data-translate="productCategoryLabel">Category</label>
                    <select id="productCategory" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="cookies" data-translate="categoryCookies">Cookies</option>
                        <option value="cakes" data-translate="categoryCakes">Cakes</option>
                        <option value="almonds" data-translate="categoryAlmonds">Almonds</option>
                        <option value="candles" data-translate="categoryCandles">Candles</option>
                        <option value="handicrafts" data-translate="categoryHandicrafts">Handicrafts</option>
                        <option value="other" data-translate="categoryOther">Other</option>
                    </select>
                </div>
                <div class="flex justify-end space-x-3">
                    <button type="button" id="cancelProduct" data-translate="cancelButton" class="px-4 py-2 border border-gray-300 rounded-md">
                        Cancel
                    </button>
                    <button type="submit" data-translate="saveProductButton" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Add Discount Modal -->
    <div id="discountModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md slide-in">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold" data-translate="addDiscountModalTitle">Create Discount Pack</h3>
                <button id="closeDiscountModal" class="text-gray-5ß00 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="discountForm">
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="discountName" data-translate="discountNameLabel">Discount Name</label>
                    <input type="text" id="discountName" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="discountType" data-translate="discountTypeLabel">Discount Type</label>
                    <select id="discountType" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="bundle" data-translate="discountTypeBundle">Bundle (e.g., 2 for $5)</option>
                        <option value="percentage" data-translate="discountTypePercentage">Percentage Off</option>
                        <option value="fixed" data-translate="discountTypeFixed">Fixed Amount Off</option>
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4" id="discountFields">
                    <!-- Bundle Discount Fields -->
                    <div id="bundleFields" class="hidden">
                        <div class="col-span-2">
                            <label class="block text-gray-700 mb-2" data-translate-dynamic="bundleQuantityLabel">Quantity Required</label>
                            <input type="number" id="bundleQuantity" class="w-full px-3 py-2 border border-gray-300 rounded-md" min="1" required>
                        </div>
                        <div class="col-span-2">
                            <label class="block text-gray-700 mb-2" data-translate-dynamic="bundlePriceLabel">Bundle Price ($)</label>
                            <input type="number" step="0.01" id="bundlePrice" class="w-full px-3 py-2 border border-gray-300 rounded-md" min="0.01" required>
                        </div>
                    </div>

                    <!-- Percentage Discount Fields -->
                    <div id="percentageFields" class="hidden">
                        <div class="col-span-2">
                            <label class="block text-gray-700 mb-2" for="percentageValue" data-translate-dynamic="percentageValueLabel">Percentage Off</label>
                            <div class="flex items-center">
                                <input type="number" id="percentageValue" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="10" min="1" max="100">
                                <span class="ml-2">%</span>
                            </div>
                        </div>
                    </div>

                    <!-- Fixed Amount Discount Fields -->
                    <div id="fixedFields" class="hidden">
                        <div class="col-span-2">
                            <label class="block text-gray-700 mb-2" for="fixedAmount" data-translate-dynamic="fixedAmountLabel">Amount Off ($)</label>
                            <input type="number" step="0.01" id="fixedAmount" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                        </div>
                        <div class="col-span-2 mt-2">
                            <label class="inline-flex items-center">
                                <input type="checkbox" id="withProductCheckbox" class="form-checkbox">
                                <span class="ml-2" data-translate-dynamic="withProductLabel">When purchased with another product</span>
                            </label>
                            <select id="withProductSelect" class="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md hidden">
                                <!-- Products will be populated here -->
                            </select>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" data-translate="applyToProductLabel">Apply to Product</label>
                    <select id="discountProduct" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <!-- Products will be populated here -->
                    </select>
                </div>
                <div class="flex justify-end space-x-3">
                    <button type="button" id="cancelDiscount" data-translate="cancelButton" class="px-4 py-2 border border-gray-300 rounded-md">
                        Cancel
                    </button>
                    <button type="submit" data-translate="saveDiscountButton" class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                        Save Discount
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- New Event Modal -->
    <div id="eventModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md slide-in">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold" data-translate="newEventModalTitle">New Market Event</h3>
                <button id="closeEventModal" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="eventForm">
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="eventModalName" data-translate="eventNameLabel">Event Name</label>
                    <input type="text" id="eventModalName" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="eventStartDate" data-translate="eventStartDateLabel">Start Date</label>
                    <input type="date" id="eventStartDate" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="eventEndDate" data-translate="eventEndDateLabel">End Date</label>
                    <input type="date" id="eventEndDate" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="eventModalLocation" data-translate="eventLocationLabel">Location</label>
                    <input type="text" id="eventModalLocation" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                </div>
    <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="eventCost">Event Cost ($)</label>
                    <input type="number" step="1000" id="eventCost" value="0" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                </div>
                <div class="flex justify-end space-x-3">
                    <button type="button" id="cancelEvent" data-translate="cancelButton" class="px-4 py-2 border border-gray-300 rounded-md">
                        Cancel
                    </button>
                    <button type="submit" data-translate="startEventButton" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Start Event
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Today's Sale Report Modal -->
    <div id="todaysSaleReportModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-2xl slide-in">
            <div class="mb-6">
                <h3 class="text-xl font-semibold mb-2"><span data-translate="salesReportLabel">Sales Report</span>: <span id="reportEventName"></span></h3>
                <p class="text-gray-600"><span data-translate="locationLabel">Location</span>: <span id="reportEventLocation" class="font-medium"></span></p>
                <p class="text-gray-600"><span data-translate="dateLabel">Date</span>: <span id="reportEventDate" class="font-medium"></span></p>
                
                <div class="mt-4 flex justify-between">
                    <div class="bg-gray-50 p-4 rounded-lg w-1/4">
                        <p class="text-sm text-gray-500" data-translate="totalSalesLabel">Total Sales</p>
                        <p class="text-2xl font-bold" id="reportTotalSales">$0.00</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg w-1/4">
                        <p class="text-sm text-gray-500" data-translate="totalProfitLabel">Total Profit</p>
                        <p class="text-2xl font-bold" id="reportTotalProfit">$0.00</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg w-1/4">
                        <p class="text-sm text-gray-500" data-translate="transactionsLabel">Transactions</p>
                        <p class="text-2xl font-bold" id="reportTransactionCount">0</p>
                    </div>
                </div>

                <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1" data-translate="selectDateLabel">Select Date</label>
                    <select id="reportDateSelect" class="w-full border border-gray-300 rounded-md px-3 py-2">
                        <option value="today">Today</option>
                    </select>
                </div>

                <div class="mt-4 bg-gray-50 p-4 rounded-lg">
                    <canvas id="salesChart" width="400" height="200"></canvas>
                </div>
            </div>
            <div class="flex justify-center">
                <button id="closeReportModal" class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                    <span data-translate="closeButton">Close</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Sale Complete Modal -->
    <div id="saleCompleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-sm slide-in">
            <div class="text-center mb-6">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check text-green-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2" data-translate="saleCompleteModalTitle">Sale Complete!</h3>
                <p class="text-gray-600"><span data-translate="saleCompleteTotalLabel">Total:</span> <span id="modalTotal" class="font-bold">$0.00</span></p>
                <p class="text-gray-600"><span data-translate="saleCompletePaidWithLabel">Paid with:</span> <span id="modalPaymentMethod" class="font-bold">Cash</span></p>
            </div>
            <div class="flex justify-center">
                <button id="closeSaleCompleteModal" data-translate="doneButton" class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Done
                </button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>

--------------------

Original script.js:

--------------------
// App State
const state = {
    products: [],
    discounts: [],
    currentSale: {
        items: [],
        paymentMethod: 'cash',
        subtotal: 0,
        discount: 0,
        total: 0
    },
    salesHistory: [],
    currentEvent: null,
    eventStartDate: null,
    eventEndDate: null
};

// --- Translation State ---
let currentLanguage = localStorage.getItem('marketMasterLanguage') || 'en'; // Load saved language or default to 'en'
let translations = {};

// DOM Elements
const elements = {
    productList: document.getElementById('productList'),
    discountList: document.getElementById('discountList'),
    receiptArea: document.getElementById('receiptArea'),
    receiptItems: document.getElementById('receiptItems'),
    emptyReceiptMessage: document.getElementById('emptyReceiptMessage'),
    receiptTotals: document.getElementById('receiptTotals'),
    subtotalAmount: document.getElementById('subtotalAmount'),
    discountAmount: document.getElementById('discountAmount'),
    totalAmount: document.getElementById('totalAmount'),
    quickAddButtons: document.getElementById('quickAddButtons'),
    salesHistory: document.getElementById('salesHistory'),
    totalSales: document.getElementById('totalSales'),
    
    // Modals
    productModal: document.getElementById('productModal'),
    discountModal: document.getElementById('discountModal'),
    eventModal: document.getElementById('eventModal'),
    saleCompleteModal: document.getElementById('saleCompleteModal'),
    
    // Forms
    productForm: document.getElementById('productForm'),
    discountForm: document.getElementById('discountForm'),
    eventForm: document.getElementById('eventForm'),
    
    // Buttons
    addProductBtn: document.getElementById('addProductBtn'),
    addDiscountBtn: document.getElementById('addDiscountBtn'),
    newEventBtn: document.getElementById('newEventBtn'),
    clearSaleBtn: document.getElementById('clearSaleBtn'),
    todaysSaleReportModal: document.getElementById('todaysSaleReportModal'),
    reportEventName: document.getElementById('reportEventName'),
    reportEventLocation: document.getElementById('reportEventLocation'),
    reportEventDate: document.getElementById('reportEventDate'),
    reportTotalSales: document.getElementById('reportTotalSales'),
    reportTotalProfit: document.getElementById('reportTotalProfit'),
    reportTransactionCount: document.getElementById('reportTransactionCount'),
    reportDateSelect: document.getElementById('reportDateSelect'),
    salesChart: document.getElementById('salesChart'),
    closeReportModal: document.getElementById('closeReportModal'),
    completeSaleBtn: document.getElementById('completeSaleBtn'),
    paymentMethodBtns: document.querySelectorAll('.payment-method-btn'),
    
    // Close buttons
    closeProductModal: document.getElementById('closeProductModal'),
    closeDiscountModal: document.getElementById('closeDiscountModal'),
    closeEventModal: document.getElementById('closeEventModal'),
    closeSaleCompleteModal: document.getElementById('closeSaleCompleteModal'),
    cancelProduct: document.getElementById('cancelProduct'),
    cancelDiscount: document.getElementById('cancelDiscount'),
    cancelEvent: document.getElementById('cancelEvent'),
    
    // Modal display elements
    modalTotal: document.getElementById('modalTotal'),
    modalPaymentMethod: document.getElementById('modalPaymentMethod')
};
// --- Translation Functions ---
async function loadTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        translations = await response.json();
        currentLanguage = lang;
        localStorage.setItem('marketMasterLanguage', lang);
        document.documentElement.lang = lang; // Update html lang attribute
        applyTranslations();
        // Re-render dynamic elements that depend on translations
        renderProducts();
        renderDiscounts();
        renderReceipt();
        renderSalesHistory();
        renderQuickAddButtons(); // If quick add buttons have translatable text
        updateSalesTotal(); // Update label
        // Update modal titles and labels if they are open or need dynamic updates
        updateDynamicModalText();
    } catch (error) {
        console.error("Could not load translations:", error);
        // Fallback or error handling
    }
}

function t(key) {
    return translations[key] || key; // Return key if translation not found
}

function applyTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const targetAttribute = element.getAttribute('data-translate-attribute');

        if (targetAttribute) {
            // Translate a specific attribute (e.g., placeholder, title)
            element.setAttribute(targetAttribute, t(key));
        } else if (element.tagName === 'TITLE') {
            element.textContent = t(key);
        } else if (element.tagName === 'INPUT' && element.type === 'submit') {
             element.value = t(key); // For submit button value
        } else if (element.tagName === 'OPTION') {
             // Only translate static options, dynamic ones handled by render functions
             if (!element.closest('select[dynamic-options]')) { 
                element.textContent = t(key);
             }
        } else {
            // Use innerHTML for elements that might contain icons (like buttons)
            // Preserve existing non-text nodes (like <i> icons)
            const childNodes = Array.from(element.childNodes);
            element.innerHTML = ''; // Clear existing content
            childNodes.forEach(node => {
                if (node.nodeType !== Node.TEXT_NODE) {
                    element.appendChild(node.cloneNode(true)); // Re-append non-text nodes (like <i>)
                }
            });
            // Append the translated text node (add space for buttons etc)
            const textNode = document.createTextNode((element.tagName === 'BUTTON' || element.querySelector('i')) ? (' ' + t(key)) : t(key)); 
            element.appendChild(textNode);
        }
    });
     // Update specific elements not easily captured by data-translate
    const totalSalesLabel = elements.totalSales.previousElementSibling;
    if (totalSalesLabel) totalSalesLabel.textContent = t('todaysSalesLabel');

    // Update dynamic text placeholders if necessary (initial state messages)
    if (state.products.length === 0 && elements.productList) {
        elements.productList.innerHTML = `<div class="text-gray-500 italic">${t('noProducts')}</div>`;
    }
     if (state.discounts.length === 0 && elements.discountList) {
        elements.discountList.innerHTML = `<div class="text-gray-500 italic">${t('noDiscounts')}</div>`;
    }
    if (state.currentSale.items.length === 0 && elements.emptyReceiptMessage) {
        elements.emptyReceiptMessage.textContent = t('emptyReceiptMessage');
        elements.emptyReceiptMessage.classList.remove('hidden');
        elements.receiptItems.classList.add('hidden');
        elements.receiptTotals.classList.add('hidden');
    } else if (elements.emptyReceiptMessage) {
         elements.emptyReceiptMessage.classList.add('hidden');
         elements.receiptItems.classList.remove('hidden');
         elements.receiptTotals.classList.remove('hidden');
    }
    if (state.salesHistory.length === 0 && elements.salesHistory) {
        const historyTableBody = elements.salesHistory;
        // Check if the placeholder row exists or needs to be created
        if (historyTableBody.rows.length === 0 || (historyTableBody.rows.length === 1 && historyTableBody.rows[0].cells.length > 1)) {
             historyTableBody.innerHTML = `<tr><td colspan="4" class="px-4 py-4 text-center text-gray-500 italic">${t('noSales')}</td></tr>`;
        } else if (historyTableBody.rows.length === 1 && historyTableBody.rows[0].cells.length === 1) {
             historyTableBody.rows[0].cells[0].textContent = t('noSales');
        }
    }
    // Update modal select placeholders dynamically
    updateDynamicModalText();

}

// Helper to update text in modals that might be generated dynamically
function updateDynamicModalText() {
    // Product Modal Categories (static options handled by applyTranslations)

    // Discount Modal - Product Select (populated dynamically)
    const discountProductSelect = document.getElementById('discountProduct');
    if (discountProductSelect) {
        // If it's populated dynamically, ensure placeholder is handled correctly
        // The populateProductDropdown function should handle adding options
        // We might need to add a placeholder option there if desired
        if (discountProductSelect.options.length === 0 && state.products.length === 0) {
             discountProductSelect.innerHTML = `<option value="" disabled selected>${t('noProducts')}</option>`;
        } else if (discountProductSelect.options.length > 0 && discountProductSelect.selectedIndex === -1) {
             // If no option is selected, maybe add/select a placeholder
             // This depends on how populateProductDropdown is implemented
        }
    }

     // Discount Modal - "With Product" Select (populated dynamically)
    const withProductSelect = document.getElementById('withProductSelect');
     if (withProductSelect) {
        if (withProductSelect.options.length === 0 && state.products.length === 0) {
            withProductSelect.innerHTML = `<option value="" disabled selected>${t('noProducts')}</option>`;
        }
    }

    // Update labels within dynamically generated discount fields
    // These labels should ideally have data-translate attributes added when generated
    document.querySelectorAll('#discountFields label[data-translate-dynamic]').forEach(label => {
        const key = label.getAttribute('data-translate-dynamic');
        label.textContent = t(key);
    });

    // Update Sale Complete Modal dynamic text
    const modalPaymentMethodSpan = elements.modalPaymentMethod;
    if (modalPaymentMethodSpan && state.currentSale.paymentMethod) { // Check if payment method exists
        const paymentMethodKey = 'payment' + state.currentSale.paymentMethod.charAt(0).toUpperCase() + state.currentSale.paymentMethod.slice(1);
        modalPaymentMethodSpan.textContent = t(paymentMethodKey);
    }
}


// --- Language Switcher ---
function setupLanguageSwitcher() {
    const languageToggleBtn = document.getElementById('languageToggleBtn');
    const languageDisplay = languageToggleBtn.querySelector('[data-translate="currentLanguageDisplay"]');

    if (languageToggleBtn) {
        languageToggleBtn.addEventListener('click', () => {
            const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
            loadTranslations(newLanguage);
            // Update button text immediately based on the new language
            languageDisplay.textContent = newLanguage === 'en' ? 'English' : 'Español';
        });

        // Set initial button text based on current language
        languageDisplay.textContent = currentLanguage === 'en' ? 'English' : 'Español';
    }
}


// Initialize the app
async function init() {
    // Load sample data if no data in localStorage
    if (!localStorage.getItem('marketMasterData')) {
        loadSampleData();
    } else {
        loadFromLocalStorage();
    }
    await loadTranslations(currentLanguage); // Load initial translations

    
    // Set up event listeners
    setupEventListeners();
    
    setupLanguageSwitcher(); // Setup listener for language changes

    // Render initial UI
    renderProducts();
    renderDiscounts();
    // Display event info in unified section
    if (state.currentEvent) {
        document.getElementById('eventName').textContent = state.currentEvent.name;
        const startDate = state.currentEvent.startDate ? new Date(state.currentEvent.startDate).toLocaleDateString() : 'Invalid Date';
        const endDate = state.currentEvent.endDate ? new Date(state.currentEvent.endDate).toLocaleDateString() : 'Invalid Date';
        document.getElementById('eventDate').textContent = `${startDate} - ${endDate}`;
        document.getElementById('eventLocation').textContent = state.currentEvent.location;
    }

    updateSalesTotal();
}

// Load sample data
function loadSampleData() {
    state.products = [
        { id: 1, name: "Organic Tomatoes", price: 3.50, cost: 1.20, category: "produce" },
        { id: 2, name: "Homemade Bread", price: 5.00, cost: 1.80, category: "bakery" }
    ];
    
    state.discounts = [
        { 
            id: 1, 
            name: "Tomato Bundle", 
            type: "bundle", 
            productId: 1, 
            params: { quantity: 3, price: 9.00 } 
        }
        ];
    
    saveToLocalStorage();
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('marketMasterData', JSON.stringify({
        products: state.products,
        discounts: state.discounts,
        salesHistory: state.salesHistory,
        currentEvent: state.currentEvent,
        eventStartDate: state.eventStartDate,
        eventEndDate: state.eventEndDate
    }));
}

// Load from localStorage
function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('marketMasterData'));
    if (data) {
        state.products = data.products || [];
        state.discounts = data.discounts || [];
        state.salesHistory = data.salesHistory || [];
        state.currentEvent = data.currentEvent || null;
        state.eventStartDate = data.eventStartDate || null;
        state.eventEndDate = data.eventEndDate || null;
    }
}

// Set up event listeners
function setupEventListeners() {
    // Modal toggles
    elements.addProductBtn.addEventListener('click', () => elements.productModal.classList.remove('hidden'));
    elements.addDiscountBtn.addEventListener('click', () => {
        populateProductDropdown();
        elements.discountModal.classList.remove('hidden');
    });
    elements.newEventBtn.addEventListener('click', () => {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('eventStartDate').value = today;
        document.getElementById('eventEndDate').value = today;
        elements.eventModal.classList.remove('hidden');
    });
    document.getElementById('todaysSaleReportBtn').addEventListener('click', function(e) {
        e.preventDefault();
        showTodaysSaleReport();
    });
    
    // Modal closes
    elements.closeProductModal.addEventListener('click', () => elements.productModal.classList.add('hidden'));
    elements.closeDiscountModal.addEventListener('click', () => elements.discountModal.classList.add('hidden'));
    elements.closeEventModal.addEventListener('click', () => elements.eventModal.classList.add('hidden'));
    elements.closeSaleCompleteModal.addEventListener('click', () => {
        elements.saleCompleteModal.classList.add('hidden');
        clearCurrentSale();
    });
    
    // Cancel buttons
    elements.cancelProduct.addEventListener('click', () => elements.productModal.classList.add('hidden'));
    elements.cancelDiscount.addEventListener('click', () => elements.discountModal.classList.add('hidden'));
    elements.cancelEvent.addEventListener('click', () => elements.eventModal.classList.add('hidden'));
    
    // Form submissions
    elements.productForm.addEventListener('submit', handleProductSubmit);
    elements.discountForm.addEventListener('submit', handleDiscountSubmit);
    elements.eventForm.addEventListener('submit', handleEventSubmit);
    
    // Sales buttons
    elements.clearSaleBtn.addEventListener('click', clearCurrentSale);
    elements.completeSaleBtn.addEventListener('click', completeSale);
    
    // Payment method buttons
    elements.paymentMethodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const method = btn.dataset.method;
            state.currentSale.paymentMethod = method;
            
            // Update UI
            elements.paymentMethodBtns.forEach(b => 
                b.classList.remove('ring-2', 'ring-offset-2', 'ring-blue-500')
            );
            btn.classList.add('ring-2', 'ring-offset-2', 'ring-blue-500');
        });
    });
    
    // Set default payment method
    document.querySelector('.payment-method-btn[data-method="cash"]').classList.add('ring-2', 'ring-offset-2', 'ring-blue-500');
    
    // Discount type change
    document.getElementById('discountType').addEventListener('change', updateDiscountFields);

    // Hamburger menu toggle
    const menuButton = document.getElementById('menuButton');
    const menuDropdown = document.getElementById('menuDropdown');

    if (menuButton && menuDropdown) {
        menuButton.addEventListener('click', () => {
            menuDropdown.classList.toggle('hidden');
        });

        todaysSaleReportBtn.addEventListener('click', () => {
            showTodaysSaleReport();
            menuDropdown.classList.add('hidden');
        });

        // Close the dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!menuButton.contains(event.target) && !menuDropdown.contains(event.target)) {
                menuDropdown.classList.add('hidden');
            }
        });
        // Export and Import data
        document.getElementById('exportDataBtn').addEventListener('click', exportData);
        document.getElementById('importDataBtn').addEventListener('click', importData);
    }
}

// Handle product form submission
function handleProductSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const cost = parseFloat(document.getElementById('productCost').value);
    const category = document.getElementById('productCategory').value;
    
    const newProduct = {
        id: Date.now(), // Simple unique ID
        name,
        price,
        cost,
        category
    };
    
    state.products.push(newProduct);
    saveToLocalStorage();
    renderProducts();
    renderQuickAddButtons();
    elements.productModal.classList.add('hidden');
    elements.productForm.reset();
}

// Handle discount form submission
function handleDiscountSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('discountName').value;
    const type = document.getElementById('discountType').value;
    const productId = parseInt(document.getElementById('discountProduct').value);
    
    let params = {};
    if (type === 'bundle') {
        params.quantity = parseInt(document.getElementById('bundleQuantity').value);
        params.price = parseFloat(document.getElementById('bundlePrice').value);
        
        // Bundle discount parameters
    } else if (type === 'percentage') {
        params.percentage = parseInt(document.getElementById('percentageValue').value);
    } else if (type === 'fixed') {
        params.amount = parseFloat(document.getElementById('fixedAmount').value);
        if (document.getElementById('withProductCheckbox')?.checked) {
            params.withProduct = parseInt(document.getElementById('withProductSelect').value);
        }
    }
    
    const newDiscount = {
        id: Date.now(),
        name,
        type,
        productId,
        params
    };
    
    state.discounts.push(newDiscount);
    saveToLocalStorage();
    renderDiscounts();
    elements.discountModal.classList.add('hidden');
    elements.discountForm.reset();
}

// Handle event form submission
function handleEventSubmit(e) {
    console.log('handleEventSubmit called');
    e.preventDefault();
    
    const name = document.getElementById('eventModalName').value;
    const today = new Date().toISOString().split('T')[0];
    const startDate = document.getElementById('eventStartDate').value || today;
    const endDate = document.getElementById('eventEndDate').value || today;
    const location = document.getElementById('eventModalLocation').value || '';
    const cost = parseFloat(document.getElementById('eventCost').value) || 0;
    
    state.currentEvent = {
        id: Date.now(),
        cost,
        startTime: new Date().toISOString(),
        name,
        startDate,
        endDate,
        location
    };

    saveToLocalStorage();
    elements.eventModal.classList.add('hidden');
    elements.eventForm.reset();
    document.getElementById('eventLocation').textContent = location;
}

// Update discount fields based on selected type
function updateDiscountFields() {
    const type = document.getElementById('discountType').value;
    
    // Hide all field groups
    document.getElementById('bundleFields').classList.add('hidden');
    document.getElementById('percentageFields').classList.add('hidden');
    document.getElementById('fixedFields').classList.add('hidden');
    
    // Show only the fields for the selected type
    if (type === 'bundle') {
        document.getElementById('bundleFields').classList.remove('hidden');
    } else if (type === 'percentage') {
        document.getElementById('percentageFields').classList.remove('hidden');
    } else if (type === 'fixed') {
        document.getElementById('fixedFields').classList.remove('hidden');
    }
    
    // Handle the withProduct checkbox if it exists
    const withProductCheckbox = document.getElementById('withProductCheckbox');
    if (withProductCheckbox) {
        withProductCheckbox.addEventListener('change', (e) => {
            const select = document.getElementById('withProductSelect');
            if (e.target.checked) {
                select.classList.remove('hidden');
                populateWithProductDropdown();
            } else {
                select.classList.add('hidden');
            }
        });
    }
}

// Populate product dropdown for discounts
function populateProductDropdown() {
    const select = document.getElementById('discountProduct');
    select.innerHTML = '';
    
    state.products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        select.appendChild(option);
    });
}

// Populate "with product" dropdown
function populateWithProductDropdown() {
    const select = document.getElementById('withProductSelect');
    if (!select) return;
    
    select.innerHTML = '';
    
    state.products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        select.appendChild(option);
    });
}

// Render products list
function renderProducts() {
    if (!elements.productList) return; // Guard clause
    if (state.products.length === 0) {
        elements.productList.innerHTML = `<div class="text-gray-500 italic">${t('noProducts')}</div>`;
        return;
    }
    
    let html = '';
    state.products.forEach(product => {
        html += `
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                    <div class="font-medium">${product.name}</div>
                    <div class="text-sm text-gray-500">$${product.price.toFixed(2)} | Cost: $${product.cost.toFixed(2)}</div>
                </div>
                <div class="flex space-x-2">
                    <button class="text-blue-500 hover:text-blue-700 edit-product" data-id="${product.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-500 hover:text-red-700 delete-product" data-id="${product.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="text-green-600 hover:text-green-800 add-to-sale" data-id="${product.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    elements.productList.innerHTML = html;
    
    // Add event listeners to new buttons
    document.querySelectorAll('.add-to-sale').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.id);
            addProductToSale(productId);
        });
    });
    
    document.querySelectorAll('.edit-product').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.id);
            editProduct(productId);
        });
    });
    
    document.querySelectorAll('.delete-product').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.id);
            deleteProduct(productId);
        });
    });
    
    // Update quick add buttons
    renderQuickAddButtons();
}

// Render discounts list
function renderDiscounts() {
    if (!elements.discountList) return; // Guard clause
    if (state.discounts.length === 0) {
        elements.discountList.innerHTML = `<div class="text-gray-500 italic">${t('noDiscounts')}</div>`;
        return;
    }
    
    let html = '';
    state.discounts.forEach(discount => {
        const product = state.products.find(p => p.id === discount.productId);
        const productName = product ? product.name : 'Unknown Product';
        
        let discountText = '';
        if (discount.type === 'bundle') {
            discountText = `${discount.params.quantity} for $${discount.params.price.toFixed(2)}`;
        } else if (discount.type === 'percentage') {
            discountText = `${discount.params.percentage}% off`;
        } else if (discount.type === 'fixed') {
            discountText = `$${discount.params.amount.toFixed(2)} off`;
            if (discount.params.withProduct) {
                const withProduct = state.products.find(p => p.id === discount.params.withProduct);
                if (withProduct) {
                    discountText += ` with ${withProduct.name}`;
                }
            }
        }
        
        html += `
            <div class="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                    <div class="font-medium">${discount.name}</div>
                    <div class="text-sm text-gray-600">${productName}</div>
                    <div class="text-sm font-semibold text-yellow-700">${discountText}</div>
                </div>
                <div class="flex space-x-2">
                    <button class="text-blue-500 hover:text-blue-700 edit-discount" data-id="${discount.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-500 hover:text-red-700 delete-discount" data-id="${discount.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    elements.discountList.innerHTML = html;
    
    // Add event listeners to new buttons
    document.querySelectorAll('.edit-discount').forEach(btn => {
        btn.addEventListener('click', () => {
            const discountId = parseInt(btn.dataset.id);
            editDiscount(discountId);
        });
    });
    
    document.querySelectorAll('.delete-discount').forEach(btn => {
        btn.addEventListener('click', () => {
            const discountId = parseInt(btn.dataset.id);
            deleteDiscount(discountId);
        });
    });
}

// Render quick add buttons
function renderQuickAddButtons() {
    let html = '';
    
    state.products.forEach(product => {
        html += `
            <button class="bg-gray-100 hover:bg-gray-200 p-2 rounded flex flex-col items-center quick-add-btn" data-id="${product.id}">
                <span class="font-medium">${product.name}</span>
                <span class="text-sm text-gray-600">$${product.price.toFixed(2)}</span>
            </button>
        `;
    });
    
    elements.quickAddButtons.innerHTML = html;
    
    // Add event listeners to quick add buttons
    document.querySelectorAll('.quick-add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.id);
            addProductToSale(productId);
        });
    });
}

// Add product to current sale
function addProductToSale(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product already exists in sale
    const existingItem = state.currentSale.items.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        state.currentSale.items.push({
            productId,
            name: product.name,
            price: product.price,
            quantity: 1,
            discountApplied: 0
        });
    }
    
    calculateSaleTotals();
    renderReceipt();
}

// Edit product
function editProduct(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    // Populate the form
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCost').value = product.cost;
    document.getElementById('productCategory').value = product.category;
    
    // Show the modal
    elements.productModal.classList.remove('hidden');
    
    // Temporary storage of product ID being edited
    elements.productForm.dataset.editingId = productId;
}

// Delete product
function deleteProduct(productId) {
    if (confirm(t('confirmDeleteProduct'))) {
        state.products = state.products.filter(p => p.id !== productId);
        saveToLocalStorage();
        renderProducts();
        renderQuickAddButtons();
    }
}

// Edit discount
function editDiscount(discountId) {
    const discount = state.discounts.find(d => d.id === discountId);
    if (!discount) return;
    
    // Populate the form
    document.getElementById('discountName').value = discount.name;
    document.getElementById('discountType').value = discount.type;
    populateProductDropdown();
    document.getElementById('discountProduct').value = discount.productId;
    
    // Trigger the discount type change to show appropriate fields
    document.getElementById('discountType').dispatchEvent(new Event('change'));
    
    // Wait for fields to render
    setTimeout(() => {
        if (discount.type === 'bundle') {
            document.getElementById('bundleQuantity').value = discount.params.quantity;
            document.getElementById('bundlePrice').value = discount.params.price;
        } else if (discount.type === 'percentage') {
            document.getElementById('percentageValue').value = discount.params.percentage;
        } else if (discount.type === 'fixed') {
            document.getElementById('fixedAmount').value = discount.params.amount;
            if (discount.params.withProduct) {
                document.getElementById('withProductCheckbox').checked = true;
                populateWithProductDropdown();
                document.getElementById('withProductSelect').value = discount.params.withProduct;
                document.getElementById('withProductSelect').classList.remove('hidden');
            }
        }
    }, 100);
    
    // Show the modal
    elements.discountModal.classList.remove('hidden');
    
    // Temporary storage of discount ID being edited
    elements.discountForm.dataset.editingId = discountId;
}

// Delete discount
function deleteDiscount(discountId) {
    if (confirm(t('confirmDeleteDiscount'))) {
        state.discounts = state.discounts.filter(d => d.id !== discountId);
        saveToLocalStorage();
        renderDiscounts();
    }
}

// Render receipt
function renderReceipt() {
    if (state.currentSale.items.length === 0) {
        elements.emptyReceiptMessage.classList.remove('hidden');
        elements.receiptItems.classList.add('hidden');
        elements.receiptTotals.classList.add('hidden');
        return;
    }
    
    elements.emptyReceiptMessage.classList.add('hidden');
    elements.receiptItems.classList.remove('hidden');
    elements.receiptTotals.classList.remove('hidden');
    
    let html = '';
    state.currentSale.items.forEach(item => {
        const discountApplied = item.discountApplied > 0;
        const originalPrice = item.price * item.quantity;
        const discountedPrice = originalPrice - item.discountApplied;
        
        html += `
            <div class="flex justify-between items-center py-2 receipt-item">
                <div class="flex items-center">
                    <div class="font-medium">${item.name}</div>
                    ${discountApplied ? `<span class="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full discount-badge">SAVED $${item.discountApplied.toFixed(2)}</span>` : ''}
                </div>
                <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                        <button class="text-gray-500 hover:text-gray-700 change-quantity" data-id="${item.productId}" data-change="-1">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="font-medium">${item.quantity}</span>
                        <button class="text-gray-500 hover:text-gray-700 change-quantity" data-id="${item.productId}" data-change="1">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="text-right min-w-20">
                        <div class="font-medium">$${discountedPrice.toFixed(2)}</div>
                        ${discountApplied ? `<div class="text-xs text-gray-500 line-through">$${originalPrice.toFixed(2)}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    elements.receiptItems.innerHTML = html;
    
    // Update totals display
    elements.subtotalAmount.textContent = `$${state.currentSale.subtotal.toFixed(2)}`;
    elements.discountAmount.textContent = `-$${state.currentSale.discount.toFixed(2)}`;
    elements.totalAmount.textContent = `$${state.currentSale.total.toFixed(2)}`;
    
    // Add event listeners to quantity change buttons
    document.querySelectorAll('.change-quantity').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.id);
            const change = parseInt(btn.dataset.change);
            updateProductQuantity(productId, change);
        });
    });
}

// Update product quantity in current sale
function updateProductQuantity(productId, change) {
    const item = state.currentSale.items.find(item => item.productId === productId);
    if (!item) return;
    
    item.quantity += change;
    
    // Remove item if quantity reaches 0
    if (item.quantity <= 0) {
        state.currentSale.items = state.currentSale.items.filter(i => i.productId !== productId);
    }
    
    calculateSaleTotals();
    renderReceipt();
}

// Calculate sale totals and apply discounts
function calculateSaleTotals() {
    let subtotal = 0;
    let totalDiscount = 0;
    
    // Calculate subtotal first
    state.currentSale.items.forEach(item => {
        const product = state.products.find(p => p.id === item.productId);
        if (product) subtotal += product.price * item.quantity;
    });

    // Apply discounts
    state.currentSale.items.forEach(item => {
        item.discountApplied = 0; // Reset discount before recalculation
        
        const product = state.products.find(p => p.id === item.productId);
        if (!product) return;
        
        // Apply discounts if any
        const applicableDiscounts = state.discounts.filter(d => d.productId === product.id);
        applicableDiscounts.forEach(discount => {
            // Check discount criteria
            let meetsCriteria = true;
            
            
            if (!meetsCriteria) return;

            if (discount.type === 'bundle') {
                const bundleCount = Math.floor(item.quantity / discount.params.quantity);
                if (bundleCount > 0) {
                    const originalPrice = product.price * discount.params.quantity;
                    const discountAmount = originalPrice - discount.params.price;
                    item.discountApplied += discountAmount * bundleCount;
                    totalDiscount += discountAmount * bundleCount;
                }
            } else if (discount.type === 'percentage') {
                if (item.quantity >= 1) { // Apply to all quantities
                    const discountAmount = (product.price * item.quantity) * (discount.params.percentage / 100);
                    item.discountApplied += discountAmount;
                    totalDiscount += discountAmount;
                }
            } else if (discount.type === 'fixed') {
                if (item.quantity >= 1) { // Fixed amount per item
                    const discountAmount = discount.params.amount * item.quantity;
                    item.discountApplied += discountAmount;
                    totalDiscount += discountAmount;
                    
                    // Check if this is a combo discount and the other product is also in the cart
                    if (discount.params.withProduct) {
                        const withProductInCart = state.currentSale.items.some(i => i.productId === discount.params.withProduct);
                        if (!withProductInCart) {
                            totalDiscount -= discountAmount;
                            item.discountApplied -= discountAmount;
                        }
                    }
                }
            }
        });
    });
    
    state.currentSale.subtotal = subtotal;
    state.currentSale.discount = totalDiscount;
    state.currentSale.total = subtotal - totalDiscount;
}

// Clear current sale
function clearCurrentSale() {
    state.currentSale = {
        items: [],
        paymentMethod: 'cash',
        subtotal: 0,
        discount: 0,
        total: 0
    };
    
    // Reset payment method UI
    elements.paymentMethodBtns.forEach(b => 
        b.classList.remove('ring-2', 'ring-offset-2', 'ring-blue-500')
    );
    document.querySelector('.payment-method-btn[data-method="cash"]').classList.add('ring-2', 'ring-offset-2', 'ring-blue-500');
    
    renderReceipt();
}

// Complete sale
function completeSale() {
    if (state.currentSale.items.length === 0) {
        alert('Cannot complete an empty sale');
        return;
    }
    
    // Add to sales history
    const saleRecord = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        items: [...state.currentSale.items],
        paymentMethod: state.currentSale.paymentMethod,
        total: state.currentSale.total,
        eventId: state.currentEvent?.id
    };
    
    state.salesHistory.unshift(saleRecord);
    saveToLocalStorage();
    
    // Show confirmation modal
    elements.modalTotal.textContent = `$${saleRecord.total.toFixed(2)}`;
    elements.modalPaymentMethod.textContent = state.currentSale.paymentMethod;
 
 // Calculate and display event profit
    const profit = calculateEventProfit(state.currentSale, state.currentEvent);
    elements.saleCompleteModal.classList.remove('hidden');
    
    // Update sales total display
    updateSalesTotal();

    // Clear current sale
    clearCurrentSale();

// Calculate event profit
function calculateEventProfit(sale, event) {
  let totalRevenue = sale.total;
  let totalCostOfGoods = 0;
  sale.items.forEach(item => {
    const product = state.products.find(p => p.id === item.productId);
    if (product) {
      totalCostOfGoods += product.cost * item.quantity;
    }
  });
  let eventCost = event ? event.cost : 0;
  let totalProfit = totalRevenue - totalCostOfGoods - eventCost;
  return totalProfit;
}
    
    // Render sales history
    renderSalesHistory();
}

// Render sales history
function renderSalesHistory() {
    if (!elements.salesHistory) return; // Guard clause
    if (state.salesHistory.length === 0) {
        elements.salesHistory.innerHTML = `
            <tr>
                <td colspan="4" class="px-4 py-4 text-center text-gray-500 italic">${t('noSales')}</td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    state.salesHistory.forEach(sale => {
        const itemsList = sale.items.map(item => 
            `${item.quantity} × ${item.name}`
        ).join(', ');
        
        let methodText = sale.paymentMethod;
        let methodIcon = '';
        if (sale.paymentMethod === 'cash') {
            methodIcon = '<i class="fas fa-money-bill-wave mr-1"></i>';
        } else if (sale.paymentMethod === 'card') {
            methodIcon = '<i class="fas fa-credit-card mr-1"></i>';
        } else if (sale.paymentMethod === 'venmo') {
            methodIcon = '<i class="fab fa-vimeo-v mr-1"></i>';
        }
        
        html += `
            <tr>
                <td class="px-4 py-3">${sale.timestamp}</td>
                <td class="px-4 py-3">${itemsList}</td>
                <td class="px-4 py-3">${methodIcon} ${methodText}</td>
                <td class="px-4 py-3 font-bold">$${sale.total.toFixed(2)}</td>
            </tr>
        `;
    });
    
    elements.salesHistory.innerHTML = html;
}

// Show Today's Sale Report
function showTodaysSaleReport() {
    // Show modal
    elements.todaysSaleReportModal.classList.remove('hidden');
    
    // Populate event details
    if (state.currentEvent) {
        elements.reportEventName.textContent = state.currentEvent.name;
        elements.reportEventLocation.textContent = state.currentEvent.location;
        elements.reportEventDate.textContent = new Date(state.currentEvent.startDate).toLocaleDateString();
    }
    
    // Calculate and display stats
    console.log('All sales:', state.salesHistory);
    const todaySales = state.salesHistory.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        const today = new Date();
        console.log(`Checking sale date: ${saleDate} vs today: ${today}`);
        return saleDate.getDate() === today.getDate() &&
               saleDate.getMonth() === today.getMonth() &&
               saleDate.getFullYear() === today.getFullYear();
    });
    console.log('Today sales:', todaySales);

    // Calculate profit for a sale
    function calculateSaleProfit(sale) {
        return sale.items.reduce((profit, item) => {
            const product = state.products.find(p => p.id === item.productId);
            if (product) {
                return profit + ((item.price - product.cost) * item.quantity);
            }
            return profit;
        }, 0);
    }
    
    const totalSales = todaySales.reduce((sum, sale) => sum + sale.total, 0);
    const totalProfit = todaySales.reduce((sum, sale) => sum + calculateSaleProfit(sale), 0);
    
    elements.reportTotalSales.textContent = `$${totalSales.toFixed(2)}`;
    elements.reportTotalProfit.textContent = `$${totalProfit.toFixed(2)}`;
    elements.reportTransactionCount.textContent = todaySales.length;
    
    // Initialize chart with hourly sales data
    const hourlySales = {};
    const hourlyProfit = {};
    
    // Initialize hours with 0 values
    for (let i = 0; i < 24; i++) {
        hourlySales[i] = 0;
        hourlyProfit[i] = 0;
    }
    
    // Aggregate sales by hour
    todaySales.forEach(sale => {
        const hour = new Date(sale.timestamp).getHours();
        hourlySales[hour] += sale.total;
        hourlyProfit[hour] += calculateSaleProfit(sale);
    });
    
    // Convert to arrays for chart
    const hours = Array.from({length: 24}, (_, i) => i);
    const salesData = hours.map(h => hourlySales[h]);
    const profitData = hours.map(h => hourlyProfit[h]);
    
    // Create chart
    new Chart(elements.salesChart, {
        type: 'line',
        data: {
            labels: hours.map(h => `${h}:00`),
            datasets: [
                {
                    label: 'Sales ($)',
                    data: salesData,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                },
                {
                    label: 'Profit ($)',
                    data: profitData,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Hourly Sales Performance'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Close modal handler
    elements.closeReportModal.addEventListener('click', () => {
        elements.todaysSaleReportModal.classList.add('hidden');
    });
}

// Export data function
function exportData() {
    const data = JSON.stringify({
        products: state.products,
        discounts: state.discounts,
        salesHistory: state.salesHistory,
        currentSale: state.currentSale,
        currentEvent: state.currentEvent,
        eventStartDate: state.eventStartDate,
        eventEndDate: state.eventEndDate,
        currentLanguage: currentLanguage
    });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'marketmaster_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Import data function
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (readEvent) => {
            try {
                const data = JSON.parse(readEvent.target.result);
                state.products = data.products || [];
                state.discounts = data.discounts || [];
                state.salesHistory = data.salesHistory || [];
                state.currentEvent = data.currentEvent || null;
                saveToLocalStorage();
                renderProducts();
                renderDiscounts();
                renderSalesHistory();
                updateSalesTotal();
                alert('Data imported successfully!');
            } catch (error) {
                alert('Error importing data: ' + error);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// Update sales total
function updateSalesTotal() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of today

    const todaysSales = state.salesHistory.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        return saleDate >= today;
    });

    const total = todaysSales.reduce((sum, sale) => sum + sale.total, 0);

    elements.totalSales.textContent = `$${total.toFixed(2)}`;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);


--------------------

Original style.css:

--------------------

.receipt-item:hover {
    background-color: #f3f4f6;
}
.discount-badge {
    animation: pulse 2s infinite;
}
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}
.slide-in {
    animation: slideIn 0.3s ease-out;
}
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

/* Basic styling for the hamburger menu */
#menuButton {
    
}

#menuDropdown {
    z-index: 10; /* Ensure it's above other elements */
}

#menuDropdown a {
    display: block;
    padding: 0.5rem 1rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
}

#menuDropdown a:hover {
    background-color: #f8f9fa;
    color: #007bff;
}

--------------------

Original locales/en.json:

--------------------
{
  "appTitle": "MarketMaster - Farmer's Market Sales Tracker",
  "headerTitle": "MarketMaster",
  "headerSubtitle": "Track your farmer's market sales with ease",
  "todaysSalesLabel": "Today's Sales:",
  "newEventButton": "New Event",
  "productsTitle": "Products",
  "noProducts": "No products added yet",
  "discountPacksTitle": "Discount Packs",
  "noDiscounts": "No discount packs created yet",
  "currentSaleTitle": "Current Sale",
  "clearSaleButton": "Clear",
  "completeSaleButton": "Complete Sale",
  "emptyReceiptMessage": "Add items to begin a sale",
  "subtotalLabel": "Subtotal:",
  "discountsLabel": "Discounts:",
  "totalLabel": "Total:",
  "quickAddTitle": "QUICK ADD",
  "paymentMethodTitle": "PAYMENT METHOD",
  "paymentCash": "Cash",
  "paymentCard": "Transfer",
  "paymentVenmo": "Nequi",
  "salesHistoryTitle": "Today's Sales",
  "tableHeaderTime": "Time",
  "tableHeaderItems": "Items",
  "tableHeaderPayment": "Payment",
  "tableHeaderTotal": "Total",
  "noSales": "No sales recorded yet",
  "addProductModalTitle": "Add New Product",
  "productNameLabel": "Product Name",
  "productPriceLabel": "Price ($)",
  "productCostLabel": "Cost ($)",
  "productCategoryLabel": "Category",
  "categoryProduce": "Produce",
  "categoryBakery": "Bakery",
  "categoryDairy": "Dairy",
  "categoryMeat": "Meat",
  "categoryCrafts": "Crafts",
  "categoryCookies": "Cookies",
  "categoryCakes": "Cakes",
  "categoryAlmonds": "Almonds",
  "categoryCandles": "Candles",
  "categoryHandicrafts": "Handicrafts",
  "categoryOther": "Other",
  "cancelButton": "Cancel",
  "saveProductButton": "Save Product",
  "addDiscountModalTitle": "Create Discount Pack",
  "discountNameLabel": "Discount Name",
  "discountTypeLabel": "Discount Type",
  "discountTypeBundle": "Bundle (e.g., 2 for $5)",
  "discountTypePercentage": "Percentage Off",
  "discountTypeFixed": "Fixed Amount Off",
  "applyToProductLabel": "Apply to Product",
  "saveDiscountButton": "Save Discount",
  "newEventModalTitle": "New Market Event",
  "eventNameLabel": "Event Name",
  "eventStartDateLabel": "Start Date",
  "eventEndDateLabel": "End Date",
  "eventLocationLabel": "Location",
  "selectProductPlaceholder": "Select a product...",
  "confirmDeleteProduct": "Are you sure you want to delete this product?",
  "confirmDeleteDiscount": "Are you sure you want to delete this discount?",
  "bundleQuantityLabel": "Items in Bundle",
  "bundlePriceLabel": "Bundle Price ($)",
  "minItemsLabel": "Minimum Items Required",
  "minTotalLabel": "Minimum Purchase Total ($)",
  "percentageValueLabel": "Percentage Off",
  "fixedAmountLabel": "Amount Off ($",
  "withProductLabel": "When purchased with another product",
  "startEventButton": "Start Event",
  "saleCompleteModalTitle": "Sale Complete!",
  "saleCompleteTotalLabel": "Total:",
  "saleCompletePaidWithLabel": "Paid with:",
  "doneButton": "Done",
  "saleCompleteProfitLabel": "Profit:",
  "reportsMenu": "Reports",
  "todaysSaleReport": "Today's Sale",
  "salesReportLabel": "Sales Report",
  "locationLabel": "Location",
  "dateLabel": "Date",
  "totalSalesLabel": "Total Sales",
  "totalProfitLabel": "Total Profit",
  "transactionsLabel": "Transactions",
  "selectDateLabel": "Select Date",
  "closeButton": "Close",
  "exportData": "Export Data",
  "importData": "Import Data",
  "dataImportedSuccessfully": "Data imported successfully!",
  "errorImportingData": "Error importing data: ",
  "languageButtonText": "English"
}


--------------------

