
# Database Setup

This folder contains SQL scripts to set up the necessary tables in your Supabase project.

## How to Apply the SQL Scripts

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Create a "New Query"
4. Copy the contents of each SQL file and paste them in the query editor
5. Execute the query

## Order of Execution

Make sure to run the SQL scripts in the following order:

1. `companies.sql` - Creates the companies table and inserts initial data
2. `clients.sql` - Creates the clients table
3. `vehicles.sql` - Creates the vehicles table
4. `contracts.sql` - Creates the contracts table

## Tables Overview

### Companies
Stores information about rental companies:
- ID (UUID)
- Name
- Code (unique identifier like 'moove', 'yoou')
- CNPJ/Company ID
- Address info
- Logo URL
- Theme color

### Clients
Stores information about renters:
- ID (UUID)
- First name
- Surname
- ID/Passport number
- Address
- Email
- Phone

### Vehicles
Stores information about rental vehicles:
- ID (UUID)
- Vehicle type
- Make
- Model
- Fuel type
- License plate
- Year
- Color
- Company ID (foreign key to companies)

### Contracts
Stores rental contract information:
- ID (UUID)
- Contract number (unique)
- Client ID (foreign key)
- Vehicle ID (foreign key)
- Company ID (foreign key)
- Start date and time
- End date and time
- Delivery location
- Return location
- Rental rate
- Deposit amount
- Sign date
- Status (active, completed, canceled)
- PDF URL
- Created by (user ID)
