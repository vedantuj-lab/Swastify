import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  Search, 
  Calendar,
  FileUp,
  MoreVertical,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { translations } from "@/lib/translations";

interface Record {
  id: string;
  name: string;
  date: string;
  type: string;
  size: string;
}

export default function HealthRecords({ language }: { language: string }) {
  const t = translations[language] || translations.en;
  const [records, setRecords] = useState<Record[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const deleteRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const filteredRecords = records.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 space-y-8" id="health-records">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-display gradient-text">{t.healthRecords}</h1>
          <p className="text-muted-foreground">{t.healthRecordsDesc}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 gap-2 font-bold">
            <FileUp className="w-5 h-5" />
            {t.upload}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder={t.searchRecords} 
            className="pl-12 rounded-2xl h-12 bg-secondary/20 border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="secondary" className="rounded-2xl h-12 px-6 gap-2">
          <Filter className="w-4 h-4" />
          {t.filter}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {filteredRecords.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass-card border-none hover:bg-secondary/10 transition-colors group rounded-3xl">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{record.name}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {record.date}
                        </span>
                        <span className="bg-secondary px-2 py-0.5 rounded-full font-bold uppercase">
                          {record.type}
                        </span>
                        <span>{record.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                      <Download className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-red-500/10 hover:text-red-500"
                      onClick={() => deleteRecord(record.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-20 bg-secondary/10 rounded-[3rem] border-2 border-dashed border-secondary/20">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-muted-foreground font-medium">{t.noRecordsFound}</p>
        </div>
      )}
    </div>
  );
}
