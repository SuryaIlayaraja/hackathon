import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://ycorozkbfeqwybujwnaz.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljb3JvemtiZmVxd3lidWp3bmF6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzY2MTQ2MCwiZXhwIjoyMDczMjM3NDYwfQ.Uk8pYd76w-UEEzLmnXrTJEMdo86sB71iOA1vnQI8UoQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        return await handleGet(req, res);
      case 'POST':
        return await handlePost(req, res);
      case 'PUT':
        return await handlePut(req, res);
      case 'DELETE':
        return await handleDelete(req, res);
      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Equipment API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGet(req, res) {
  const { type, available, q } = req.query;

  let query = supabase.from('equipment').select('*');

  if (type) {
    query = query.eq('type', type);
  }

  if (available === 'true') {
    query = query.eq('availability', 'Available');
  }

  if (q) {
    query = query.or(`name.ilike.%${q}%,type.ilike.%${q}%,location.ilike.%${q}%`);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  res.json(data);
}

async function handlePost(req, res) {
  const equipmentData = req.body;
  
  // Set timestamps
  const now = new Date().toISOString();
  equipmentData.created_at = now;
  equipmentData.updated_at = now;
  
  const { data, error } = await supabase
    .from('equipment')
    .insert([equipmentData])
    .select();

  if (error) throw error;
  
  res.status(201).json({ 
    message: 'Equipment added successfully', 
    equipment: data[0] 
  });
}

async function handlePut(req, res) {
  const { id } = req.query;
  const updateData = req.body;
  updateData.updated_at = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('equipment')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) throw error;
  
  if (data.length === 0) {
    return res.status(404).json({ error: 'Equipment not found' });
  }

  res.json({ 
    message: 'Equipment updated successfully', 
    equipment: data[0] 
  });
}

async function handleDelete(req, res) {
  const { id } = req.query;
  
  const { error } = await supabase
    .from('equipment')
    .delete()
    .eq('id', id);

  if (error) throw error;
  res.json({ message: 'Equipment deleted successfully' });
}
