"use client";
import { useState, useEffect, useMemo } from "react";
import type React from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tabs,
  Tab,
  CircularProgress,
  Chip,
  FormControl,
  InputLabel,
  TablePagination,
} from "@mui/material";
import debounce from "lodash/debounce";
import { getAllOfferList } from "@/services/DashboardService";
import Image from "next/image";
import { palette } from "@/theme/palette";

type Offer = {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  type: string;
  status: string;
};

export default function OfferList() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);

  const debouncedFetch = useMemo(
    () =>
      debounce(
        async (
          searchTerm: string,
          selectedType: string,
          selectedStatus: string,
          currentPage: number,
          limit: number
        ) => {
          try {
            setLoading(true);

            const data = await getAllOfferList({
              search: searchTerm,
              type: selectedType,
              status: selectedStatus,
              page: (currentPage + 1).toString(),
              per_page: limit.toString(),
            });

            setOffers(data?.data);
            setTotal(data?.meta?.total);
          } catch (error) {
            console.error("Error fetching offers:", error);
          } finally {
            setLoading(false);
          }
        },
        300
      ),
    []
  );

  useEffect(() => {
    debouncedFetch(search, type, status, page, rowsPerPage);
    return () => {
      debouncedFetch.cancel();
    };
  }, [search, type, status, page, rowsPerPage, debouncedFetch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleTypeChange = (event: any) => {
    setType(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return {
          bg: "#22C55E29",
          color: "#118D57",
        };
      case "Rejected":
        return {
          bg: "#FF563029",
          color: "#B71D18",
        };
      case "Pending":
        return {
          bg: "#FFAB0029",
          color: "#B76E00",
        };
      default:
        return {
          bg: "#22C55E29",
          color: "#118D57",
        };
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        boxShadow:
          "0px 12px 24px -4px rgba(145, 158, 171, 0.12),0px 0px 2px 0px rgba(145, 158, 171, 0.2)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>
        Offer List
      </Typography>

      {/* Tabs */}
      <Tabs value={status === "" ? 0 : 1} sx={{ mb: 3 }}>
        <Tab label="All" onClick={() => setStatus("")} />
        <Tab label="Accepted" onClick={() => setStatus("accepted")} />
      </Tabs>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          size="small"
          sx={{ flexGrow: 1, maxWidth: "505px" }}
        />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={handleTypeChange} label="Type">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
            <MenuItem value="pay_as_you_go">Pay As You Go</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : offers?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  No offers found
                </TableCell>
              </TableRow>
            ) : (
              offers?.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>
                    <Box>
                      {offer.user_name}
                      <Typography
                        variant="body2"
                        color={palette.text?.disabled}
                      >
                        {offer.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{offer.phone}</TableCell>
                  <TableCell>{offer.company}</TableCell>
                  <TableCell>{offer.jobTitle}</TableCell>
                  <TableCell>{offer.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={offer.status}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(offer.status).bg,
                        color: getStatusColor(offer.status).color,
                        fontWeight: 500,
                        borderRadius: "6px",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
                      <Image
                        width={20}
                        height={20}
                        src={"/images/icons/edit-icon.png"}
                        alt="edit icon"
                      />
                    </IconButton>
                    <IconButton size="small">
                      <Image
                        width={20}
                        height={20}
                        src={"/images/icons/table-menu-icon.png"}
                        alt="table menu icon"
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
}
