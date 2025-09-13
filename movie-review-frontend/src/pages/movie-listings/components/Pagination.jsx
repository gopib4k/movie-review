import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  totalItems = 0,
  itemsPerPage = 20,
  onPageChange,
  className = '',
  showInfo = true,
  maxVisiblePages = 7
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages?.push(1);
      if (startPage > 2) {
        pages?.push('ellipsis-start');
      }
    }
    
    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages?.push(i);
    }
    
    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages?.push('ellipsis-end');
      }
      pages?.push(totalPages);
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getItemRange = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    return { start, end };
  };

  const visiblePages = getVisiblePages();
  const { start, end } = getItemRange();

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 ${className}`}>
      {/* Results Info */}
      {showInfo && (
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{start?.toLocaleString()}</span> to{' '}
          <span className="font-medium text-foreground">{end?.toLocaleString()}</span> of{' '}
          <span className="font-medium text-foreground">{totalItems?.toLocaleString()}</span> results
        </div>
      )}
      {/* Pagination Controls */}
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          iconName="ChevronLeft"
          iconSize={16}
          className="px-3"
        >
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {visiblePages?.map((page, index) => {
            if (typeof page === 'string') {
              return (
                <div
                  key={page}
                  className="px-3 py-2 text-muted-foreground"
                >
                  <Icon name="MoreHorizontal" size={16} />
                </div>
              );
            }

            return (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="min-w-[40px] px-3"
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          iconName="ChevronRight"
          iconPosition="right"
          iconSize={16}
          className="px-3"
        >
          <span className="hidden sm:inline">Next</span>
        </Button>
      </div>
      {/* Mobile Page Info */}
      <div className="sm:hidden text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

// Compact pagination for smaller spaces
export const CompactPagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  className = '' 
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        iconName="ChevronLeft"
        iconSize={16}
      />
      
      <div className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-md">
        <span className="text-sm font-medium text-foreground">
          {currentPage}
        </span>
        <span className="text-sm text-muted-foreground">of</span>
        <span className="text-sm font-medium text-foreground">
          {totalPages}
        </span>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        iconName="ChevronRight"
        iconSize={16}
      />
    </div>
  );
};

// Simple pagination with just prev/next
export const SimplePagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  className = '' 
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        iconName="ChevronLeft"
        iconPosition="left"
        iconSize={16}
      >
        Previous
      </Button>
      
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        iconName="ChevronRight"
        iconPosition="right"
        iconSize={16}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;