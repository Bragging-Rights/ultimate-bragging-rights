// pagination.js

const calculatePagination = (data, currentPage = 1, pageSize = 50) => {
    const skip = (currentPage - 1) * pageSize;
    const paginatedData = data.slice(skip, skip + pageSize);
    const totalPages = Math.ceil(data.length / pageSize);
  
    return {
      currentPage,
      totalPages,
      data: paginatedData,
    };
  };
  
  module.exports = calculatePagination;
  